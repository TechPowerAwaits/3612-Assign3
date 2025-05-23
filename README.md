# COMP 3612 Assignment 3: The F1 API and Webpage

## About

This project's aim was to teach how to use NodeJS to create a simple API. It was made for a Web Development course at [Mount Royal University](https://www.mtroyal.ca/) taught by [Randy Connolly](https://randyconnolly.com/) during the Fall of 2024.

It involves an Formula One API covering years 2019-2023. A webpage was copied from a [previous assignment](https://github.com/TechPowerAwaits/3612-Assign2) and modified to test this API.

### Project Information

**Author:** Richard Johnston \<<techpowerawaits@outlook.com>\>

**Link:** <https://f1-data-xco5.onrender.com/>

### License

The [BSD Zero-Clause License](https://spdx.org/licenses/0BSD.html) is used for the code written.

```
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

The data itself was provided by [Randy Connolly](https://randyconnolly.com/) and is of unknown source.

### Functionality

Unless otherwise stated, all data returned is in the JSON format.

| Link                                                                    | Provides                                                                                                 |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <https://f1-data-xco5.onrender.com/>                                    | Provides a user-friendly interface to view information from 2019-2023 on Formula One Races from the API. |
| <https://f1-data-xco5.onrender.com/api>                                 | Returns all the data available from the API (circuits, constructors, drivers, results, qualifying, etc.) |
| <https://f1-data-xco5.onrender.com/api/circuits>                        | Returns all data on circuits.                                                                            |
| <https://f1-data-xco5.onrender.com/api/circuits/>_id_                   | Returns the particular circuit with the given id.                                                        |
| <https://f1-data-xco5.onrender.com/api/constructors>                    | Returns all data on constructors.                                                                        |
| <https://f1-data-xco5.onrender.com/api/constructors/>_ref_              | Returns the particular constructor with the given reference name.                                        |
| <https://f1-data-xco5.onrender.com/api/constructorResults/>_ref_/_year_ | Returns all the race results corresponding to the given constructor during the provided year.            |
| <https://f1-data-xco5.onrender.com/api/drivers>                         | Returns all data on drivers.                                                                             |
| <https://f1-data-xco5.onrender.com/api/drivers/>_ref_                   | Returns the particular driver with the given reference name.                                             |
| <https://f1-data-xco5.onrender.com/api/driverResults/>_ref_/_year_      | Returns all the race results corresponding to the given driver during the provided year.                 |
| <https://f1-data-xco5.onrender.com/api/races/season/>_year_             | Returns all the information on races in the given year.                                                  |
| <https://f1-data-xco5.onrender.com/api/races/id/>_id_                   | Returns the particular race with the given id.                                                           |
| <https://f1-data-xco5.onrender.com/api/results/race/>_id_               | Returns all the races results corresponding to the given race id.                                        |
| <https://f1-data-xco5.onrender.com/api/results/season/>_year_           | Returns all the race results from the provided year.                                                     |
| <https://f1-data-xco5.onrender.com/qualifying/race/>_id_                | Returns all the qualifiers corresponding associated with the given race id.                              |
| <https://f1-data-xco5.onrender.com/qualifying/season/>_year_            | Returns all the qualifiers from the provided year.                                                       |

For links accepting arguments, if there are no items associated with the provided values, an Error object will be returned with a message indicating that nothing was found.

## Testing

The vast majority of these tests were provided by [Prof. Connolly](https://randyconnolly.com/). Thanks goes to him for providing the assignment and tests.

| Link                                                                     | Desired Result                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| <https://f1-data-xco5.onrender.com/api/circuits>                         | Returns an array of all the circuits from the API.                              |
| <https://f1-data-xco5.onrender.com/api/circuits/1>                       | Returns the circuit with an id of 1.                                            |
| <https://f1-data-xco5.onrender.com/api/constructors>                     | Returns an array of all the constructors from the API.                          |
| <https://f1-data-xco5.onrender.com/api/constructors/mclaren>             | Returns information on the McLaren constructor.                                 |
| <https://f1-data-xco5.onrender.com/api/coNSTruCTors/mclaren>             | Returns information on the McLaren constructor.                                 |
| <https://f1-data-xco5.onrender.com/api/constructors/javascript>          | Will return an Error object (invalid constructor provided).                     |
| <https://f1-data-xco5.onrender.com/api/constructorResults/mclaren/2023>  | Returns an array of all race results involving McLaren in 2023.                 |
| <https://f1-data-xco5.onrender.com/api/constructorResults/MERCEDES/2020> | Returns an array of all race results involving Mercedes in 2020.                |
| <https://f1-data-xco5.onrender.com/api/constructorResults/mclaren/2040>  | Will return an Error object (year is not in range).                             |
| <https://f1-data-xco5.onrender.com/api/constructorResults/comp3612/2023> | Will return an Error object (invalid constructor provided).                     |
| <https://f1-data-xco5.onrender.com/api/drivers>                          | Returns an array of all the drivers from the API.                               |
| <https://f1-data-xco5.onrender.com/api/drivers/hamilton>                 | Returns information on Lewis Hamilton.                                          |
| <https://f1-data-xco5.onrender.com/api/drivers/HAMilton>                 | Returns information on Lewis Hamilton.                                          |
| <https://f1-data-xco5.onrender.com/api/drivers/randy>                    | Will return Error object (invalid driver provided).                             |
| <https://f1-data-xco5.onrender.com/api/driverResults/piastri/2023>       | Returns an array of all race results involving Oscar Piastri.                   |
| <https://f1-data-xco5.onrender.com/api/driverResults/piastri/2002>       | Will return an Error object (year is not in range).                             |
| <https://f1-data-xco5.onrender.com/api/driverResults/piastre/2023>       | Will return an Error object (invalid driver provided).                          |
| <https://f1-data-xco5.onrender.com/api/driverResults/piastre/2002>       | Will return an Error object (year is not in range and invalid driver provided). |
| <https://f1-data-xco5.onrender.com/api/races/season/2023>                | Returns an array of all races from 2023.                                        |
| <https://f1-data-xco5.onrender.com/api/races/seasoning/2023>             | Will return an Error object (invalid path).                                     |
| <https://f1-data-xco5.onrender.com/api/races/season/2032>                | Will return an Error object (year is not in range).                             |
| <https://f1-data-xco5.onrender.com/api/races/id/1010>                    | Returns the race with an id of 1010.                                            |
| <https://f1-data-xco5.onrender.com/api/races/id/-1010>                   | Will return an Error object (invalid id provided).                              |
| <https://f1-data-xco5.onrender.com/api/races/id/1756348576>              | Will return an Error object (invalid id provided).                              |
| <https://f1-data-xco5.onrender.com/api/qualifying/season/2023>           | Returns an array of all qualifiers from 2023.                                   |
| <https://f1-data-xco5.onrender.com/api/qualifying/seasoning/2023>        | Will return an Error object (invalid path).                                     |
| <https://f1-data-xco5.onrender.com/api/qualifying/season/2032>           | Will return an Error object (year is not in range).                             |
| <https://f1-data-xco5.onrender.com/api/qualifying/race/1010>             | Returns an array of all qualifiers involving race 1010.                         |
| <https://f1-data-xco5.onrender.com/api/qualifying/race/-1010>            | Will return an Error object (invalid race provided).                            |
| <https://f1-data-xco5.onrender.com/api/qualifying/race/1756348576>       | Will return an Error object (invalid race provided).                            |
| <https://f1-data-xco5.onrender.com/api/results/race/1100>                | Returns an array of results involving the race 1100.                            |
| <https://f1-data-xco5.onrender.com/api/results/race/1756348576>          | Will return an Error object (invalid race provided).                            |
| <https://f1-data-xco5.onrender.com/api/results/season/2023>              | Returns an array of all results involving season 2023.                          |
| <https://f1-data-xco5.onrender.com/api/results/season/2034>              | Will return an Error object (year is not in range).                             |
