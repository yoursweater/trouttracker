
# To-dos
  - add two more handlers for getFish and getFlies
  - Construct general data and update flow, which proceeds as follows:
    * User loads app
    * User selects fish type, which triggers display of fly type and updates state
    * App queries flies from flyTable to populate. User may add a fly. User then selects a fly.
      which will update the state, such that it now contains fish + fly.
    * Same process occurs for hook size
    * On the submit screen, when a user hits submit the app queries for location, followed by the weather.
      Once the app knows the fish, fly, hooksize, location, and weather, it submits to DB. State is reset to empty values.