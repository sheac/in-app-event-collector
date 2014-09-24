in-app-event-collector
======================

Simple version of a server that collects in-app events sent from (mobile) devices

The main idea is to borrow all the requirements from the old YMC Network app that served this purpose and then build version 2, but using the Functional Reactive Programming paradigm, instead of callbacks or promises. This effort has the blessing for CTO of the company Dr. Sandy "Ing" Shen.

I feel like FRP is a great approach for this product, since the requirements are so easily conceptualized as incoming streams of data that need to be filtered, modified, merged, etc.

The following is a subset of the requirements of the existing project. My plan is to go down the list, one-by-one, satisfying the requirements as I have time.
* Must track a list of legal app ids by:
  * Querying the central auth server for the list upon startup and storing that in memory
  * Recieving requests from the central auth server that inform of new legal app ids and updating the in-memory list
* Must receive JSON-formatted in-app events
* If the `YA0token` property on the event is a legal app id, then it must store the event data in the `events` collection of the MongoDB database
* Processing the incoming events as follows:
  * Add a `time` property that indicates the current time
  * If the event records a purchase, translate from the local currency into USD and include it as the `YA0USD` property
  * Record the IP address of the device in the `ip` property
  * if both:
     * the `num_retries` property is present and greater than 0, and
     * the `ctime` property is present and `time - ctime < 1 week`
  * --> then use the value of `ctime` for `time`
  * If the `YA0debug` property is present and "truthy", store the event in the alternate `sdk_debug` collection
* Must manage the storage of traffic attribution postbacks as follows:
  * If a postback arrives on the postback endpoint:
    * Try to match the postback data to an existing `YA0birth` (first-launch/install) event in the `events` collection
    * If no match is found, standardize the data and store it in the `postbacks` collection
    * If a match is found, add the 3rd party tracker-specific attribution data to the matching event
  * If an event arrives on the event endpoint:
    * Try to match the event to an existing document in the `postbacks` collection
    * If no match is found, store the event as usual
    * If an event is found, add the 3rd party tracker-specific attribution data and then store
  * The goal of storing the postback data is so that we can determine which traffic channels are responsible for which in-app events, and report this information to the marketing and production team 


---

## Update 1. Rough Plan for App State Management

The two things I need to manage at this point (that can fit in memory) are legal game ids (`YA0tokens`) and currency exchange rates (for generating `YA0USD`). The following diagram is a rough plan on how to accomplish that:

![alt](https://github.com/sheac/in-app-event-collector/blob/master/imgs/Managing-State-From-Incoming-Data.png)
