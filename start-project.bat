@echo off
echo Cloning the project...
git clone https://github.com/iamrdev33/nawy-interview.git
cd nawy-interview

echo Starting up Docker containers...
docker-compose up --build
