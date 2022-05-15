#!/usr/bin/with-contenv bashio
set +u

export MQTT_USERNAME=$(bashio::config 'mqtt_username')
export MQTT_PASSWORD=$(bashio::config 'mqtt_password')
export MQTT_HOSTNAME=$(bashio::config 'mqtt_hostname')
export DEVICE_PATH=$(bashio::config 'device_path')

node --version

bashio::log.info "Starting Eglo Connect Bridge"
yarn run start