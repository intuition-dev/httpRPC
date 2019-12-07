
TOC of the 3 sections

https://medium.com/@cekvneich/short-review-of-basics-of-full-stack-big-data-scalability-and-clusters-of-distributed-data-bcc8e3a8abd3

## Capacity Planning (Section 2)

Lets do some capacity planning.
Because once you know the performance, you can plan the capacity. You should know how many daily active users you have and based on DAU estimate how many concurrent users you have.
Lets slow down a bit to restate: based on concurrent users of your web app and performance of you app. you can compute out what the current data server capacity you need is. Eg. if you have 500 concurrent users, your data server should be something above 1,000 tps (transactions per second).
And the next step of capacity planning is how fast is your DAU growing? Lets say 20% each month. 
That means you have to provision 20% more capacity for next month. 
Should you over provision capacity? Depends: does your organization like to burn capital? ( There are executives that take pride in how much budget they spend on tech )

So to plan, and if you studied engineering or science: we'll use math! (As opposed to adjectives like: fast, big, etc.)
So lets find out our performance/tps, by measuring how long it takes to insert ~ 5MM records!


### Load testing part I

We'll use DB-IP's City to IP CSV file, we'll insert it into a SQL DB and measure how long it takes!

One popular platform is nodejs. We'll use these libraries/packages:
- better-sqlite3 to insert into sql 
- csv-parser to stream read csv
- ip to map ip address string to an integer
- perfy to measure time/performance.

You can use yarn add to add each of these packages. Of course you should be somewhat close to your platform and use case so if you use pgSQL and Java, then you can find similar libraries/packages to above, and I'm sure you can adjust. But I'll continue with the nodejs example, you'll need an insert function like:

```
   ins(p) {
      let fromInt:number = ip.toLong(p['0'])

      this.write(`INSERT INTO geo( fromInt, first, last, cont,
            cou, state, city, 
            lat, long
         )
            VALUES
         ( ?,?,?,?,
           ?,?,?,
           ?,?
         )`
         ,
         fromInt, p['0'], p['1'], p['2'],
         p['3'], p['4'], p['5'],
         p['6'], p['7']
      )
   }//()
```
You should test that you can insert a single row into a SQL table. If you are using some kind of NoSQL: then they have something similar to SQL to insert command. (aside: the first line of code converts IP string address to an integer)

You can get a CSV file I used from 
https://db-ip.com/db/download/ip-to-city-lite

And now you need to read the CSV file, something like:

```
   async import() {
      perfy.start('imp')
      
      await fs.createReadStream(csvFile)
      .pipe(csv({headers:false}))
      .on('data', async (row) => {
            await db.ins(row)
      })
      .on('end', () => {
         let time = perfy.end('imp')
         log.info(time)
      })
   }//()
```

Here the first thing we do is take a timestamp, and the the last thing we do is display the time. In the middle we read each row from csv, and write a row to the db.
So now you have idea of tps writes for your platform. 
Lets get more info on performance: how long does it take to read/find/select?


### Load testing part II

How long does it take to read/find/select?

We just inserted a DB of city, long, lat, and IP. A common need is some variation of: find a closest city for an IP string address.
For example each http request from a browser has the IP of the request passed to the server.

So my dear reader as a part of the capacity plan: write a SQL select command to find the closest city to a given IP address!
(Of course if you are NoSQL then you can use similar select commands)

My answer: One of my cloud providers is Primcast, they offer NVMe, above find/query takes 0.5 milliseconds.
What is your answer?

As you gain expertise, you'll find that majority of achievable performance is in the 'table'(E/R) design. 

### Load testing part III

In addition to writes and reads, the other part of performance is size. A lot of marketing folks use adjectives like *big* data. 
That is OK for pedestrian/citizen use. But I think we can agree that the if the data fits on a local PC|laptop: it is not big. It just regular data.
For example my laptop is 1 terabytes  w/ 32 gigs of RAM. 
A single cloud server RAM is over 512 RAM and over 4 terabytes of NVMe(|m2|u2). (Aside, in 2010s we used fast SSDs for storage, but in 2020s we are using RAM for SQL storage, with just a small boot drive that is not used for data. And a NAS for backup). So anything I can run locally is: not big, it has to be greater than a terabyte. If you have less than a terabyte and call it 'big', it is a bit of brain fart.
So if you have regular data, there is no need to cluster disturbed data services (eg. ClickHouse and many similar competitors, like Druid, Spark, ELK and a thousand more, mostly from Apache ).  
But there are people that work on PetaBytes, for example NSA. In order to know how to leverage a data cluster: you must be familiar with how a single data server works. You'll likely enjoy a classic book: SQL for Smarties by Celko. (also there is SQL for Dummies, but that is for citizens/pedestrians and not for professional programmers)

So test your platform, you should know how long it takes to service a request, and estimate number of concurrent users so that you know how to scale. If you skip this step: you will have bad performance.  But if you want just to enjoy, using tech from 2018-19 average engineers can get ~ 25K tps on a single cloud box. A single box is sufficient for most Fortune 500 organizations; but maybe not for NSA and such that look at many Petabytes of data.  

### Lessons learned

To do a distributed cluster of data systems you must first master a single system. And... once you master a single system, you may not need a cluster. (Fun fact: due to network latency, clusters are slower, but larger). It is possible and probable that you don't need K8. And for sure: if you don't know how a single data box works: you should not use K8, leave that for people who do.

