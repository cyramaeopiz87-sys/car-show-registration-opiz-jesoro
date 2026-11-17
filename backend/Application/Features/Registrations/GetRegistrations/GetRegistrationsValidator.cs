using Domain.Enums;
using FluentValidation;

namespace Application.Features.Registrations.GetRegistrations;

public sealed class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("PageSize must be between 1 and 50.");

        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .WithMessage("ParticipantName must not exceed 150 characters.");

        RuleFor(x => x.Type)
            .Must(t => string.IsNullOrWhiteSpace(t) || Enum.TryParse<RegistrationType>(t, true, out _))
            .WithMessage("Type must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.Status)
            .Must(s => string.IsNullOrWhiteSpace(s) || Enum.TryParse<RegistrationStatus>(s, true, out _))
            .WithMessage("Status must be Pending, Confirmed, CheckedIn, or Cancelled.");
    }
}
