"""Sample workshops to use in the development environment.

These were intially designed to be used by the `script.reset_database` module."""

from ...models import Workshop


workshop1 = Workshop(id=1, title="workshop 1")

workshop2 = Workshop(id=2, title="workshop 2")

workshop3 = Workshop(id=3, title="workshop 3")

workshop4 = Workshop(id=4, title="workshop 4")

models = [
    workshop1, 
    workshop2,
    workshop3, 
    workshop4
]
