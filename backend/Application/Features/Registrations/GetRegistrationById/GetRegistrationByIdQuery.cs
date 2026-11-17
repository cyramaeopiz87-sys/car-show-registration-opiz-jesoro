using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrationById;

public record GetRegistrationByIdQuery(Guid Id) : IQuery<Result<GetRegistrationByIdResponse>>;
