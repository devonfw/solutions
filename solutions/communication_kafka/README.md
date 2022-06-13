### Table of Contents

# Abstract
The goal of documentation is to present the Spring Kafka functionalities in the context of microservices. The main focus would be how Kafka-based messaging solutions are implemented with Spring Boot. Furthermore, the documentation also provides information regarding the implementation of logging, tracing, and retry within an application.

Spring Kafka, Docker, and Postman are the tools being used during the creation of this document. To run both Kafka message broker and Zookeeper, Docker image is used. For the app testing, we use Postman by sending already defined http requests to examine the expected outputs.

# Introduction and Goals
The application should show how spring-kafka can be implemented within a sample application to leverage Apache Kafka's functionalities.

The primary use case of this documentation is to explain the implementation of message transfer process based on Kafka (Produce-Consume Topics). 

1. Kafka Message Broker (Produce-Consume Topics)
   Kafka is a message broker in part because it allows several consumers to perform different logic focused on a single message. A message broker allows services and applications to exchange messages with one another. The structure of the messages is explicitly specified and independent of the services that send them.

   The Producer is in charge of sending messages through a linked application to the message broker. In the meanwhile, the consumer consumes the messages that have been queued in the message broker. Messages are stored in a queue/topic by the message broker.
   

2. Streaming
   The Kafka Streams API is a component of the Apache Kafka open-source data transformation and enrichment project. Kafka Streams is most commonly used to create real-time streaming data pipelines and applications that react to the data streams. It uses a combination of messaging, storage, and stream processing to store and analyze both historical and real-time data.

   As previously stated, Kafka Streams provides an API for developing client applications that alter data in Apache Kafka and then publish the modified data onto a new topic. The client application is where the data is processed.
   
   
3. Temporary/Permanent Data Storing
   Kafka is a streaming data system that may hold data for a period of time before eliminating it. Meaning, Kafka does not discard messages as soon as the consumer reads them. 
   
   Kafka may also store data on permanent storage and replicate data among brokers in a cluster, giving it the aspect of a database. Kafka's data can be stored indefinitely by the user.

4. Logging
    Apache Kafka Logs are a collection of numerous data segments stored on disk that are referred to as form-topic partitions or specific topic-partitions. Each Kafka log represents a logical unique topic-based partitioning. 
    
    Logging with Apache Kafka makes the transformation of unstructured logging streams into an analyzable and understandable output possible. The output can then be used for detecting potential and ongoing problems as well as better environment monitoring.

5. Retry 
   Failures in a distributed system may happen, i.e. failed message process, network errors, runtime exceptions. Therefore, the retry logic implementation is something essential to have. 

    It is important to note that Retries in Kafka can be quickly implemented at the consumer side. This is known as Simple Blocking Retries. To accomplish visible error handling without causing real-time disruption, Non-Bloking Retries and Dead Letter Topics are implemented.
    
6. Data Monitoring (Metrics)
    Metrics are measurements that capture a value about the systems at a specific point in time, such as (provide a use case as an example from sample application). They are often collected every second, minute, or other regular interval to track a system's performance over time. 
    
    Kafka Monitoring Metrics measure how well a component, for example network latency, performs its role. It's vital to keep an eye on the health of Kafka deployment to ensure that the applications that rely on it keep working.
    
7. Event Sourcing
   Event sourcing is a style of application design where state changes are logged as a time-ordered sequence of records. Kafka's support for very large stored log data makes it an excellent backend for an application built in this style.
   
   
8. Tracking (Activity Tracking)
   With activity tracking it is possible to track page views, searches, uploads or other actions users may take. When an event happens in the blog, for example a user logs in, an information about the event and a tracking event and will be placed into a record. The record will be placed on a specified Kafka topic.

Kafka-clients have many implementations in different languages. However, this document focuses on Spring Kafka using Java.

The following are the advantages and (or) disadvantages of Kafka.
 

1. Streaming 

   Advantages
   - Transferring or filtering data between topics is easier
   - Events can be sent to external systems
   - Allows data parallelism, distributed coordination, fault 
     tolerance, scalability
   - supports the creation of lightweight and small microservices
   - it's flexible, scalable and fault-tolerant 
   - Data operations might be stateless, stateful or windowed.
   - non-buffering system => streams are processed one at a time
   

2. Logging

   Advantages
   - supports many integrations
   - a clearly readable data set
   - simple Implementation
   - provides organizations access to a large number of tools 

   Disadvantages
   - Log messages are maintained for a certain amount of time before   
     deleting them
   - During a spike, events can be deleted or lost without a user's 
     knowledge while they are timed out
   - lack of scalability within a large enterprise environment
   - An expanding company will have to increase the number pf resources on 
     servers, as well as process more logs.

3. Message Broker 

   Advantages
   - Enables communication between several services that may not be   
     executing at the same time.
   - Asynchronous processing improves system performance.
   - Ensuring that messages are delivered reliably
  
   Disadvantages
   - Increasing the complexity of the system
   - Debugging can be difficult
   - Learning takes time


4. Retry

    Advantages:
    - Real time traffic is not disrupted (Batch processing can be unblocked)
    - Error handling is observable (metadata can be obtained on the retries)
    - Higher real-time throughput can be achieved

    Disadvantage:
    - Kafka's ordering guarantees for the topic on which non-blocking retries is implemented is no longer applied.
    - The batch processing is blocked, as failed messages are repeatedly processed in real time (they are re-consumed again and again).

5. Data Monitoring (Metrics)
    
    Advantages:
   Assist in identifying potential bottlenecks and performance concerns before they cause major issues

    Disadvantages:
    - Kafka lacks a full set of management and monitoring capabilities. This makes enterprise support staff wary about implementing kafka and maintaining it in the long run.
    - The first challenge above can be overcome by installing third-party, open-source, or commercial graphical tools that offer administrative and monitoring features.

6. Event Sourcing

    Advantages:
    - Kafka can be use as a natural backbone for Event Sourcing
    Disadvantages:
    
    
7. Tracking (Activity Tracking) 

    Advantages: -
    
    
    Disadvantages:
    - often requires a very high volume of throughput 
    
    
8. Temporary/Permanent Data Storing 

    Advantages:
    - can be easily integrated with databases and cloud data lake storage
    - quite easy to understand
    - helps to avoid copying the full dump of one database to another
    
    
    Disadvantages:
    - doesn’t provide arbitrary access lookup to the data
    - there isn’t a query language like SQL available to help you access data
    - it is not a replacement for databases

# Context and Scope (in progress...)

# Solution Strategy

# Apache Kafka
Apache Kafka was built to make real-time data available to all the applications that need to use it.

## Use cases 

### Publish-Subscribe Messaging

Kafka can be used as a distributed pub/sub messaging system that replaces traditional message brokers like ActiveMQ and RabbitMQ.

### Streams

Kafka can be used to perform real-time computations on event streams.

### Metrics and Monitoring

Kafka can be used to aggregate statistics from distributed applications to produce centralized feeds with real-time metrics.

### Log Aggregation

Kafka can be used as a single source of truth by centralizing logging data across all sources in a distributed system. 

## Kafka Concepts

### Kafka and Events

An event is any type of action, incident, or change that's identified or recorded by software or applications. Kafka models events as key/value pairs. Keys are often primitive types like strings or integers. Values are serialized representations of an application domain object or a raw message.

### Kafka Topics

A topic is a log of events. They are append only: New messages always go to the end of a log. The logs are immutable - once something has happened, it is difficult to make it un-happen.
Traditional messaging systems have topics and queues, which store messages temporarily for a short time. The advantage of Kafka topics is, that every topic can be configured to expire data after it reaches a certain age, that means the data can be stored for as short as seconds to indefinitely. The logs are files stored on disk.

### Kafka Partitioning 

Partitioning takes the single topic log and breaks in into multiple logs, each of which can live on a separate node in the Kafka cluster. This makes Kafka a distributed system and helps it scale. Kafka messages can be given a key, the key guarantees that all the events from a given entity will always arrive in order. Without a key, the messages will be distributed among all the topic's partitions and any kind of ordering will be ignored.

### Kafka Brokers

Kafka is composed of a network of containers or machines called brokers, each running the Kafka broker process. Each broker hosts some set of partitions and handles incoming requests to write new events to those partitions or read events from them. Brokers also handle replication of partitions between each other.

### Replication

Partition data is copied automatically from a leader broker to follower brokers in the network. If one node in the cluster dies, another will take its role. This helps availability of data.

### Kafka Producers and Consumers

Producers connect and send key/value pairs to specific topic on the cluster. Consumers can then connect to the cluster and subscribe to one or more topics, listening and consuming key/value pairs of Kafka messages. Consuming a message does not destroy it, it can still be read by any other consumer. This differentiates Kafka from other traditional message brokers. Many consumers can read from one topic. Applications can be both consumers and producers.

#### Source: https://developer.confluent.io/what-is-apache-kafka/

# spring-kafka

The focus of this documentation is to demonstrate a Kafka-based messaging solution with the use of spring-kafka. 

>The Spring for Apache Kafka (spring-kafka) project applies core Spring concepts to the development of Kafka-based messaging solutions. It provides a "template" as a high-level abstraction for sending messages.
> -- <cite>https://spring.io/projects/spring-kafka</cite>

To use `spring-kafka` in a project, add the following dependency to the `pom.xml`:

```
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
</dependency>
```

For a gradle project add the following line to the dependencies in the `build.gradle` file:
```
implementation 'org.springframework.kafka:spring-kafka'
```


## Example Application

An example application was written to demonstrate the presented concepts and functionalities. 

### Architecture

The example application consists of two services that communicate through Kafka topics.

The `booking-service` sends newly created/requested bookings to the Kafka `bookings` topic. The `ship-service` listens for incoming events (new bookings). After the `ship-service` receives a booking, it verifies if it is possible to execute the booking. The condition would be that if there are enough containers on the requested ship. If it is, then the booking gets confirmed. Otherwise, it gets rejected. The response, which is visualized as `bookingStatus`, is then sent back to the `bookings` topic and the `booking-service` listen to this topic. Only when the response is consumed, the `bookingStatus` gets updated. 

![](https://i.imgur.com/Bb8c5l1.png)


There are 3 possible outcomes, which are visualized as `bookingStatus`: `REQUESTED`, `CONFIRMED`, `CANCELED`. The `bookingStatus` of newly requested bookings, which are sent from `booking-service` to `bookings`, is `REQUESTED`. The booking of a ship with enough available containers will result in `CONFIRMED`. 

However, there might be some cases when a booking will not be confirmed. If a ship with not enough container is booked, the booking is not possible and hence gives `CANCELED` in the `bookingStatus`. Furthermore, when an already booked ship is damaged, the `ship-service` will then send this new response to Kafka `ship-damaged` topic. Afterwards, the `bookingStatus` is updated to `CANCELED`. 

### Implementation
#### Prerequisites
The following are the necessary tech stacks that are needed to be installed before running a spring kafka application:
- Apache Kafka
- Zookeeper
**OR**
- Docker images (container that includes both Kafka Message Broker and Zookeeper)


(**TODO: further elaboration is required**).

#### Topics Creation

The `booking-service` automatically creates the necessary topics on application startup by defining beans as followed:

```
@Bean
public NewTopic bookings() {
   return TopicBuilder.name("bookings")
         .partitions(2)
         .compact()
         .build();
}
```

This creates the `bookings` topic with two partitions. The method `compact()` enables log compaction on the topic. A topic with log compaction removes any old records when there is a more recent update with the same primary key. This is optional and needs to be decided on a case-by-case basis.

The creation of all necessary topics can be found in class `BookingComponentMessagingGateway`, in which the *Messaging Gateway* pattern is implemented. The class basically isolates messaging-specific functionalities (necessary codes to send or receive a message) from the rest of the application code. Hence, only the Messaging Gate code is aware of the messaging system. 

Within the class, another topic called `shipDamagedTopic` is defined and used to fetch messages whenever the `ship-service` informs the `booking-service` that the booked ship is currently damaged.

```
@Bean
    public NewTopic shipDamagedTopic(){
        return TopicBuilder.name("shipDamagedTopic").build();
    }
```

The `booking-service` receives events from the `ship-service`. Every booking event contains an `id`, which was set by the `booking-service`.


#### Add new booking (Sending messages):

After topics are created with kafka, the subsequent step is to send messages/data to it. `spring-kafka` simplifies sending messages to topics with the class `KafkaTemplate<K,V>`, which provides methods for sending messages to Kafka topics in a feasible way. 

```
private final KafkaTemplate<Long, Object> longTemplate;
public <T> void sendMessage(String topic, Long key, T message) {
        LOG.info("Sending message : {}", message.toString());
        longTemplate.send(topic, key, message);
    }
```
The `send` API will send the data to the provided topic with the provided key and no partition. It returns a `ListenableFuture` object after a send. The `sendMessage` function is **for example implemented for adding a new booking**, which can be seen in class `BookingComponentBusinessLogic`. The new booking with its own associated id (which is retrieved using `getId()`) and the number of requested containers given by the customer is sent to `bookings` topic with message `booking`.  

```
@Transactional(rollbackFor = {CustomerNotFoundException.class})
    public Booking addBooking(Long customerId, BookingCreateDTO bookingCreateDTO) throws CustomerNotFoundException{
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();

            //Booking booking = bookingRepository.save(Booking.of(bookingCreateDTO));
            Booking booking = bookingRepository.save(new Booking(bookingCreateDTO.getShipId(), bookingCreateDTO.getContainerCount()));

            customer.addBooking(booking);
            customerRepository.save(customer);

            bookingComponentMessagingGateway.sendMessage("bookings", booking.getId(), booking);


            return booking;
        } else {
            throw new CustomerNotFoundException(customerId);
        }
    }
```
It is important to note that the status of the newly created booking is `REQUESTED`. The status of the bookings is managed by `BookingStatus`, which is an enum. The other constants within this enum are `CONFIRMED` and `CANCELED`.

#### onBookingEvent, listenBooking (Receiving messages):
The booking is then consumed via `bookings` topic by `ship-service` and will be checked, if that booking already existed in the system or the ship that would be booked also exists. The process can be found in class `ShipRestController`.
```
@KafkaListener(id = "bookings", topics = "bookings", groupId = "ship")
    public void onBookingEvent(Booking booking) throws ShipNotFoundException, BookingAlreadyConfirmedException {
        LOG.info("Received: {}", booking);
        shipComponentLogic.confirmBooking(booking);
    }
```
The booking can be confirmed through `confirmBooking` function, which can be found in `ShipComponentLogic` class. Firstly, it will check if the status of this newly created booking is already confirmed or not. If it is, then `BookingAlreadyConfirmedException` will be thrown. If it's newly created, the ship that'll be booked is checked whether there's enough available container or not. If there is not enough available containers, the booking is cancelled (`BookingStatus.CANCELED`). Otherwise, it will be confirmed (`BookingStatus.CONFIRMED`) and this confirmation is afterwards sent to the `ship-bookings` topic. 
```
@Transactional(rollbackFor = {BookingAlreadyConfirmedException.class})
    public void confirmBooking(Booking booking) throws BookingAlreadyConfirmedException, ShipNotFoundException {
        Ship ship = shipRepository.findById(booking.getShipId()).orElseThrow(() -> new ShipNotFoundException(booking.getShipId()));
        LOG.info("Found: {}", ship);

        if (booking.getBookingStatus() == BookingStatus.CONFIRMED) {
            throw new BookingAlreadyConfirmedException(booking.getId());
        } else if (booking.getBookingStatus().equals(BookingStatus.REQUESTED)) {
            if(booking.getContainerCount() < ship.getAvailableContainers()){
                ship.setAvailableContainers(ship.getAvailableContainers() - booking.getContainerCount());
                booking.updateBookingStatus(BookingStatus.CONFIRMED);
                shipRepository.save(ship);
            } else {
                booking.updateBookingStatus(BookingStatus.CANCELED);
            }
        }

        template.send("ship-bookings", booking.getId(), booking);
        LOG.info("Sent: {}", booking);
    }
```

The confirmation is finally consumed by `booking-service`, in which the booking is processed, hence updating the booking status to `CONFIRMED`.
```
@KafkaListener(id ="ship-bookings", topics = "ship-bookings", groupId = "booking")
    public void listenBooking(Booking booking) throws BookingNotFoundException {
        LOG.info("Received message: {}", booking.toString());
        bookingComponentBusinessLogic.processBooking(booking);
    }
```

#### Logging
As logging tool, SLF4J (Simple Logging Facade for Java) is used. It is an abstraction layer for different Java logging frameworks, such as Log4j2 or logback.

The general pattern (common solution) for accessing loggers by defining logger as static final instance is no longer recommended, as well as defining logger as instance variable (as slf4j.org used to recommend). For example, in `ShipComponentLogic`, the log is declared as static final instance as following:

```
private static final Logger LOG = LoggerFactory.getLogger(ShipComponentLogic.class);
```

In `BookingComponentMessagingGateway`, the log is defined as instance variable as following:
```
private final Logger LOG = LoggerFactory.getLogger(getClass());
```
Further comparison and explanation between these two different declarations can be found in https://www.slf4j.org/faq.html#declared_static.

SLF4J standardized the logging levels, which are different for the particular implementations. The usage of SLF4J is straightforward yet adaptable, allowing for better readability and performance.

The logging levels used in SLF4J are: *TRACE*, *INFO*, *DEBUG*, *ERROR*, and *WARN*. *FATAL* logging level (introduced in Log4j) is removed in SLF4J due to redundancy
>The Marker interface, part of the org.slf4j package, renders the FATAL level largely redundant.
> -- <cite>https://www.slf4j.org/faq.html#fatal</cite>

It is also dropped due to the fact that we should not determine when to terminate an application in a logging framework (https://www.baeldung.com/slf4j-with-log4j2-logback).


#### Tracing
In microservice architecture, tracing is implemented to monitor applications as well as to help identify where errors or failures occur, which may cause poor performance. Just like in our application which contains several services, it is necessary to trace the invocation from one service to another, either directly or through a kafka message broker.

In this sample application, tracing implementations are supported by Spring Cloud Sleuth. Sleuth seamlessly interfaces with logging frameworks such as SLF4J and logback to add unique IDs that aid in the tracking and diagnosis of issues leveraging logs. Before it is implemented, its dependency must be defined in `build.gradle` file as following:
```
dependencyManagement {
	imports {
		mavenBom "org.springframework.cloud:spring-cloud-dependencies:2021.0.2"
	}
}

dependencies {
    implementation 'org.springframework.cloud:spring-cloud-starter-sleuth'
}
```
Once added within the application, Spring Cloud Sleuth automatically formats the logs that contain traceId and spanId. Below you can see the logs when the application just started and when a customer just booked a ship.

```
2022-06-13 22:01:16.243  INFO [shipkafka,bd2025db4480982a,bd2025db4480982a] 14272 --- [nio-8080-exec-5] o.a.kafka.common.utils.AppInfoParser     : Kafka startTimeMs: 1655150476243
```
```
2022-06-13 22:01:16.430  INFO [shipkafka,bd2025db4480982a,cfcad1e77644ff13] 14272 --- [ bookings-0-C-1] c.d.s.s.api.ShipRestController           : Received: Booking(createdOn=Mon Jun 13 22:01:16 CEST 2022, id=12, lastUpdatedOn=Mon Jun 13 22:01:16 CEST 2022, containerCount=2, shipId=4, bookingStatus=REQUESTED, version=0)
```
The part of normal log with additional core information from Spring Sleuth follows the format of:
**[application name, traceId, spanId]**

- **Application name** - name that is set in the properties file/settings.gradle file. It can be used to aggregate logs from multiple instances of the same application.
- **traceId** - unique identifier for a specific job, request, or action. It is the same across all microservices.
- **spanId** - unique identifier that tracks a unit of work. It is assigned to each operation and therefore can be vary depends on what request is performed.


Once the application is started, the traceID and spanID **will be the same** by default.   

Further reading: https://www.baeldung.com/spring-cloud-sleuth-single-application#:~:text=TraceId%20%E2%80%93%20This%20is%20an%20id,that%20consists%20of%20multiple%20steps.

#### Retry (in progress...)