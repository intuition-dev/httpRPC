
## Capacity Planning

Lets do some capacity planning.
Because once you know the performance, you can plan the capacity. You should know how many daily active users you have and based on DAU estimate how many concurrent users you have.
Lets slow down a bit to restate: based on concurrent users of your web app and performance of you app. you can compute out what the current data server capacity you need is. Eg. if you have 500 concurrent users, your data server should be something above 1,000 tps (transactions per second).
And the next step of capacity planning is how fast is your DAU growing? Lets say 20% each month. 
That means you have to provision 20% more capacity for next month. 
Should you over provision capacity? Depends: does your organization like to burn capital? ( There are executives that take pride in how much budget they spend on tech )

So to plan, and if you studied engineering or science: we'll use math! (As opposed to adjectives like: fast, big, etc.)
So lets find out our performance/tps, by measuring how long it takes to insert ~ 5MM records!


### Measuring performance

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
You should test that you can insert a single row into a SQL table. If you are using some kind of NoSQL: then they have something similar to SQL to insert command.

You can get a CSV file I used from 
https://db-ip.com/db/download/ip-to-city-lite

And now you need to read the CSV file, something like:







