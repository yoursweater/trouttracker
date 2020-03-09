

### IN THE /trouttracker DIRECTORY (CONTAINING SERVERLESS.YML)

***WARNING: make sure to export user and region first***

# to log in to account
  - serverless login

# invoke a function
  - serverless invoke -f <functionName>

# invoke a local function
  - serverless invoke local --function <functionName>

# invoke with a test event
  - servless invoke -f <functionName> --path <testEvents/event.json>

# deploy local function changes
  - serverless deploy

