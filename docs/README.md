# Authentication Service - Alexia

[[TOC]]

This service acts as an Authentication Gateway for the Alexia system.

This means that this service performs the API Gateway role, and, at the same time,
it handles authentication for all incomming requests.

::: tip Info
Only the Authentication is handled here; the Authorization must be dealt on each
other service.
More here: [Authentication & Authorization in Microservices Architecture][auth-post]
:::

![architecture diagram][diagram]

This service implements an architecture inspired by Uncle Bob's Clean Architecture.
It praises for low coupling between parts and explicit boudaries.

[auth-post]: https://dev.to/behalf/authentication-authorization-in-microservices-architecture-part-i-2cn0
[diagram]: ./alexia-auth_gateway-final.jpg
