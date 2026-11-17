using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrationSummary;

public record GetRegistrationSummaryQuery : IQuery<Result<GetRegistrationSummaryResponse>>;
