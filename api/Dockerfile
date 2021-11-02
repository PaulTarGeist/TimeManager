FROM elixir:latest

RUN apt-get update && \
        apt-get install -y inotify-tools && \
        apt-get install -y postgresql-client

RUN mkdir /T_POO_API
COPY . /T_POO_API
WORKDIR /T_POO_API

RUN mix local.hex --force
# RUN mix deps.clean --all
RUN mix deps.get
RUN mix local.rebar --force
RUN mix do compile

CMD ["/T_POO_API/entrypoint.sh"]