FROM rabbitmq:management-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache curl

ADD config/definitions.json /opt/definitions.json
ADD config/rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

# Install delayed-message-exchange plugin
RUN curl https://dl.bintray.com/rabbitmq/community-plugins/3.8.x/rabbitmq_delayed_message_exchange/rabbitmq_delayed_message_exchange-20191008-3.8.x.zip > $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-20191008-3.8.x.zip

RUN apk add --no-cache unzip

RUN unzip $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-20191008-3.8.x.zip -d $RABBITMQ_HOME/plugins

# Enable the plugin
RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange
RUN rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management
RUN rabbitmq-plugins enable --offline rabbitmq_consistent_hash_exchange