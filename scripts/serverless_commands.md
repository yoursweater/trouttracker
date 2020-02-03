
# invoke a function
  - npx serverless invoke -f <functionName>
  - npx serverless local invoke -f <functionName>
  * use  --path <pathToYourEventJSON>  to send a test event with json
  * use --data '{"somedata": "someval"}' to pass data inline.

# deploy local changes
  - npx serverless deploy --verbose

