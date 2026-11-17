using Domain.Entities;
using FluentValidation;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty().WithMessage("'Participant Name' must not be empty.")
            .MaximumLength(150).WithMessage("Participant name must not exceed 150 characters.");

        RuleFor(x => x.ContactNumber)
            .NotEmpty().WithMessage("'Contact Number' must not be empty.")
            .Matches(@"^09\d{9}$")
            .WithMessage("Contact number must be an 11-digit Philippine mobile number starting with 09 (09XXXXXXXXX).");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'Email' must not be empty.")
            .EmailAddress().WithMessage("Email must be a valid email address.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("'Address' must not be empty.")
            .MaximumLength(300).WithMessage("Address must not exceed 300 characters.");

        RuleFor(x => x.CarMakeModel)
            .NotEmpty().WithMessage("'Car Make Model' must not be empty.")
            .MaximumLength(100).WithMessage("Car make and model must not exceed 100 characters.");

        RuleFor(x => x.PlateNumber)
            .NotEmpty().WithMessage("'Plate Number' must not be empty.")
            .MaximumLength(15).WithMessage("Plate number must not exceed 15 characters.");

        RuleFor(x => x.RegistrationType)
            .IsInEnum().WithMessage("Invalid registration type.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0).WithMessage("Amount paid must be 0 or more.")
            .Must((command, amountPaid) =>
            {
                if (!Enum.IsDefined(command.RegistrationType)) return true;
                var fee = Registration.GetFee(command.RegistrationType);
                return amountPaid <= fee;
            })
            .WithMessage((command, _) =>
            {
                var fee = Enum.IsDefined(command.RegistrationType) ? Registration.GetFee(command.RegistrationType) : 0;
                return $"Amount paid cannot be more than the fee ({fee:N0}).";
            });
    }
}
