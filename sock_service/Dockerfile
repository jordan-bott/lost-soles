FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py

COPY queries queries
COPY routers routers

RUN python -m pip install -r requirements.txt

COPY migrations migrations
# # !! PORT env var needs to match with exposed port in caprover dashboard
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80
