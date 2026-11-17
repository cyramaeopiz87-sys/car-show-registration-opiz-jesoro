using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrations;

public record GetRegistrationsQuery(
    string? ParticipantName = null,
    string? Type = null,
    string? Status = null,
    int Page = 1,
    int PageSize = 10
) : IQuery<Result<GetRegistrationsResponse>>;
