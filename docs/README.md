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

::: details Translation of the Key
  - continuous-line box: entity
  - dashed-line box: interface
  - x --> y: x uses y
  - a --|> interface: a implements interface b
  - red/orange box: business logic core
  - cloud: external agent (trigger)
:::

This service implements an architecture inspired by Uncle Bob's Clean Architecture.
It praises for low coupling between parts and explicit boudaries.

In order to explain the architecture and it's behavior, two data flows will be described:
  1. [authentication of a request](#authentication-of-a-request)
  2. [creation of a new user](#creation-of-a-new-user)


## Authentication of a request

![highlight for authentication][auth-highlight]

This service acts as API Gateway and handles the authentication for the system. Incomming
requests hit the **WebApp** component, where all the logic for dealing with HTTP requests
is implemented. It adopts [ExpressJS][expressjs] as web framework and defines a route
identically to another internal service (to act as API Gateway). It first runs the authentication,
by delegating this job to **AuthenticateRequest** component, then it acts as proxy to the
internal service. Note that WebApp, by using AuthenticateRequest, it completely decouples
the web framework decision from the actual implementation of the authentication logic -- i.e.
today the service uses ExpressJS, but if it's needed to change for another framework, the
migration will be seamless.

During the authentication process, AuthenticateRequest uses the _interface_ **UserDataservice**
to retrieve the required data. Since it is an interface, the concrete implementation
**InMemoryUserDataservice** shall be exchanged for, say, **MongoDBUserDataservice** also
seamlessly, as long as MongoDBUserDataservice implements the same UserDataservice interface.


## Creation of a new user

![highlight for creation][creation-highlight]

This service adopts a reactive architecture, since it doesn't implement any method for
allowing external clients to create users. Although, it does need the information of users
of the system, for the purposes of authentication. Then, it reacts to events (or messages)
of users created elsewhere.

For that reason, **ReactiveApp** implements a [Kafka][kafka] client and sets it to listen
to _new.user_ channel of messages. Whenever a new message from this channel is broadcast,
ReactiveApp extracts the payload of the message and delegates the job to **CreateUser**
component. Again, with this, the choice of message broker client is completely decoupled
from the implementation, supporting a possible migration to [NATS Streaming][stan] to occur
seamlessly.

The job implemented by CreateUser runs similar to how AuthenticateRequest does: using the
UserDataservice interface, instead of the actual implementation InMemoryUserDataservice.

[auth-post]: https://dev.to/behalf/authentication-authorization-in-microservices-architecture-part-i-2cn0
[diagram]: ./alexia-auth_gateway-final.jpg
[expressjs]: https://expressjs.com/
[kafka]: https://kafka.apache.org/
[stan]: https://docs.nats.io/nats-streaming-concepts/intro
[auth-highlight]: ./auth.jpg
[creation-highlight]: ./create.jpg
