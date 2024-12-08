# COMP 3612 Assignment 3: The F1 API and Webpage

## About

This project's aim was to teach how to use NodeJS to create a simple API. It was made for a Web Development course at [Mount Royal University](https://www.mtroyal.ca/) taught by [Randy Connolly](https://randyconnolly.com/) during the Fall of 2024.

It involves an Formula One API covering years 2019-2023. A webpage was copied from a [previous assignment](https://github.com/TechPowerAwaits/3612-Assign2) and modified to utilize this new API to help ensure all the components worked properly.

### Project Information

**Author:** Richard Johnston \<techpowerawaits@outlook.com\>

**Link:** https://hot-ginger-jodhpur.glitch.me/

### License

The [BSD Zero-Clause License](https://spdx.org/licenses/0BSD.html) is used for the code written.

```
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

The data itself was provided by [Randy Connolly](https://randyconnolly.com/) and is of unknown source.

### Functionality

Unless otherwise stated, all data returned is in the JSON format.

| Link                                                                     | Provides                                                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| https://hot-ginger-jodhpur.glitch.me/                                    | Provides a user-friendly interface to view information from 2019-2023 on Formula One Races from the API. |
| https://hot-ginger-jodhpur.glitch.me/api                                 | Returns all the data available from the API (circuits, constructors, drivers, results, qualifying, etc.) |
| https://hot-ginger-jodhpur.glitch.me/api/circuits                        | Returns all data on circuits.                                                                            |
| https://hot-ginger-jodhpur.glitch.me/api/circuits/_id_                   | Returns the particular circuit with the given id.                                                        |
| https://hot-ginger-jodhpur.glitch.me/api/constructors                    | Returns all data on constructors.                                                                        |
| https://hot-ginger-jodhpur.glitch.me/api/constructors/_ref_              | Returns the particular constructor with the given reference name.                                        |
| https://hot-ginger-jodhpur.glitch.me/api/constructorResults/_ref_/_year_ | Returns all the race results corresponding to the given constructor during the provided year.            |
| https://hot-ginger-jodhpur.glitch.me/api/drivers                         | Returns all data on drivers.                                                                             |
| https://hot-ginger-jodhpur.glitch.me/api/drivers/_ref_                   | Returns the particular driver with the given reference name.                                             |
| https://hot-ginger-jodhpur.glitch.me/api/driverResults/_ref_/_year_      | Returns all the race results corresponding to the given driver during the provided year.                 |
| https://hot-ginger-jodhpur.glitch.me/api/races/season/_year_             | Returns all the information on races in the given year.                                                  |
| https://hot-ginger-jodhpur.glitch.me/api/races/id/_id_                   | Returns the particular race with the given id.                                                           |
| https://hot-ginger-jodhpur.glitch.me/api/results/race/_id_               | Returns all the races results corresponding to the given race id.                                        |
| https://hot-ginger-jodhpur.glitch.me/api/results/season/_year_           | Returns all the race results from the provided year.                                                     |
| https://hot-ginger-jodhpur.glitch.me/qualifying/race/_id_                | Returns all the qualifiers corresponding associated with the given race id.                              |
| https://hot-ginger-jodhpur.glitch.me/qualifying/season/_year_            | Returns all the qualifiers from the provided year.                                                       |

For links accepting arguments, if there is no item associated with the provided value, an Error object will be returned with a message indicating it hasn't been found.

## Testing

The vast majority of these tests were provided by [Prof. Connolly](https://randyconnolly.com/). Thanks goes to him for providing the assignment and tests.

| Link                                                                      | Desired Result                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| https://hot-ginger-jodhpur.glitch.me/api/circuits                         | Returns an array of all the circuits from the API.                              |
| https://hot-ginger-jodhpur.glitch.me/api/circuits/1                       | Returns the circuit with an id of 1.                                            |
| https://hot-ginger-jodhpur.glitch.me/api/constructors                     | Returns an array of all the constructors from the API.                          |
| https://hot-ginger-jodhpur.glitch.me/api/constructors/mclaren             | Returns information on the McLaren constructor.                                 |
| https://hot-ginger-jodhpur.glitch.me/api/coNSTruCTors/mclaren             | Returns information on the McLaren constructor.                                 |
| https://hot-ginger-jodhpur.glitch.me/api/constructors/javascript          | Will return an Error object (invalid constructor provided).                     |
| https://hot-ginger-jodhpur.glitch.me/api/constructorResults/mclaren/2023  | Returns an array of all race results involving McLaren in 2023.                 |
| https://hot-ginger-jodhpur.glitch.me/api/constructorResults/MERCEDES/2020 | Returns an array of all race results involving Mercedes in 2020.                |
| https://hot-ginger-jodhpur.glitch.me/api/constructorResults/mclaren/2040  | Will return an Error object (year is not in range).                             |
| https://hot-ginger-jodhpur.glitch.me/api/constructorResults/comp3612/2023 | Will return an Error object (invalid constructor provided).                     |
| https://hot-ginger-jodhpur.glitch.me/api/drivers                          | Returns an array of all the drivers from the API.                               |
| https://hot-ginger-jodhpur.glitch.me/api/drivers/hamilton                 | Returns information on Lewis Hamilton.                                          |
| https://hot-ginger-jodhpur.glitch.me/api/drivers/HAMilton                 | Returns information on Lewis Hamilton.                                          |
| https://hot-ginger-jodhpur.glitch.me/api/drivers/randy                    | Will return Error object (invalid driver provided).                             |
| https://hot-ginger-jodhpur.glitch.me/api/driverResults/piastri/2023       | Returns an array of all race results involving Oscar Piastri.                   |
| https://hot-ginger-jodhpur.glitch.me/api/driverResults/piastri/2002       | Will return an Error object (year is not in range).                             |
| https://hot-ginger-jodhpur.glitch.me/api/driverResults/piastre/2023       | Will return an Error object (invalid driver provided).                          |
| https://hot-ginger-jodhpur.glitch.me/api/driverResults/piastre/2002       | Will return an Error object (year is not in range and invalid driver provided). |
| https://hot-ginger-jodhpur.glitch.me/api/races/season/2023                | Returns an array of all races from 2023.                                        |
| https://hot-ginger-jodhpur.glitch.me/api/races/seasoning/2023             | Will return an Error object (invalid path).                                     |
| https://hot-ginger-jodhpur.glitch.me/api/races/season/2032                | Will return an Error object (year is not in range).                             |
| https://hot-ginger-jodhpur.glitch.me/api/races/id/1010                    | Returns the race with an id of 1010.                                            |
| https://hot-ginger-jodhpur.glitch.me/api/races/id/-1010                   | Will return an Error object (invalid id provided).                              |
| https://hot-ginger-jodhpur.glitch.me/api/races/id/1756348576              | Will return an Error object (invalid id provided).                              |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/season/2023           | Returns an array of all qualifiers from 2023.                                   |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/seasoning/2023        | Will return an Error object (invalid path).                                     |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/season/2032           | Will return an Error object (year is not in range).                             |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/race/1010             | Returns an array of all qualifiers involving race 1010.                         |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/race/-1010            | Will return an Error object (invalid race provided).                            |
| https://hot-ginger-jodhpur.glitch.me/api/qualifying/race/1756348576       | Will return an Error object (invalid race provided).                            |
| https://hot-ginger-jodhpur.glitch.me/api/results/race/1100                | Returns an array of results involving the race 1100.                            |
| https://hot-ginger-jodhpur.glitch.me/api/results/race/1756348576          | Will return an Error object (invalid race provided).                            |
| https://hot-ginger-jodhpur.glitch.me/api/results/season/2023              | Returns an array of all results involving season 2023.                          |
| https://hot-ginger-jodhpur.glitch.me/api/results/season/2034              | Will return an Error object (year is not in range).                             |