using Domain.Enums;

namespace Application.Features.Registrations.GetRegistrations;

public record RegistrationDto(
    Guid Id,
    string RegistrationNumber,
    DateTime RegistrationDate,
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    RegistrationStatus Status,
    decimal RegistrationFee,
    decimal AmountPaid,
    string PaymentStatus
);

public record GetRegistrationsResponse(
    IReadOnlyList<RegistrationDto> Items,
    int Page,
    int PageSize,
    int TotalCount,
    int TotalPages
);
