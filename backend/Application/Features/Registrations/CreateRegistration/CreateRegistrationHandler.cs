using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationHandler : ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;

    public CreateRegistrationHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var trimmedPlate = command.PlateNumber.Trim();

        var plateExists = await _dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == trimmedPlate.ToLower(), cancellationToken);

        if (plateExists)
        {
            return Result<CreateRegistrationResponse>.Failure(
                new Error("Registration.Conflict", $"A registration with plate number '{trimmedPlate}' already exists."));
        }

        var existingNumbers = await _dbContext.Registrations
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        int maxSequence = 0;
        foreach (var num in existingNumbers)
        {
            if (num.StartsWith("CS27-") && int.TryParse(num.AsSpan(5), out int seq))
            {
                if (seq > maxSequence)
                {
                    maxSequence = seq;
                }
            }
        }

        int nextSequence = maxSequence + 1;
        string registrationNumber = $"CS27-{nextSequence:D4}";

        var registrationDate = DateTime.UtcNow;
        var registrationFee = Registration.GetFee(command.RegistrationType);
        var status = RegistrationStatus.Pending;

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = registrationNumber,
            RegistrationDate = registrationDate,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = trimmedPlate,
            RegistrationType = command.RegistrationType,
            Status = status,
            RegistrationFee = registrationFee,
            AmountPaid = command.AmountPaid
        };

        await _dbContext.Registrations.AddAsync(registration, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var response = new CreateRegistrationResponse(
            registration.Id,
            registration.RegistrationNumber,
            registration.RegistrationDate,
            registration.ParticipantName,
            registration.ContactNumber,
            registration.Email,
            registration.Address,
            registration.CarMakeModel,
            registration.PlateNumber,
            registration.RegistrationType,
            registration.Status,
            registration.RegistrationFee,
            registration.AmountPaid,
            registration.PaymentStatus
        );

        return Result<CreateRegistrationResponse>.Success(response);
    }
}
