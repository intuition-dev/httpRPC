

# Short review of basics of full stack, big data, scalability and clusters of distributed data servers

I have been developing for 20+ years and I have won trainer of the year. Here is a terse/short basics of full stack programing.

## Definitions: full stack(back end)

Full stack is basically a synonym for back end development and it includes services. Full stack programmers are not front programmers, for example full stack programmers are not experienced with advanced CSS deign. So if you are not a front end developer, you are a full stack developer.

Full stack/Back end programmers write services, such as REST.  And mostly these are CRUD type calls. And also they document and test the API calls to their 'REST' services. I put rest in quotes because maybe they use GraphQL or RPC, or anything: you are still full stack developer. (Also if you are using JSON, protocol buffers or Message Pack, these are still just data service calls). So I'll define that back end programmers write, document and test (end to end tests, the unit test have questionable value) client side API calls as well in whatever language the front end team uses: the back end team will write the Swift API calls for IOS, Kotlin API calls for Android, .js API calls for the browsers, PHP API calls for server side rendering etc. What ever the front end team uses, the back end team has to support.  (Also, a 'mono-repo' is typically used by the full stack team, so that the client api calls work with back end services.)

Are there teams that bifurcate that back end is only services? Yes, and they are usually dysfunctional. For example how to handle fail over of a service call? What if there are issues w/ the API call - who  handles it? I have seen back end teams blame the front end developers. A simple fix is: back end teams write and support the client side API calls.  

So full stack/back end programmers write the client side API calls used by the front end team. Those APIs call services and the services have a business layer that interacts with the DB. 
The full stack team is also responsible for security, including auth and auth of users and not just TLS, hashing/salting the passwords. Security is in the domain of the back end teams.  As is SRE, monitoring, metrics, fail over, back up/restore, disaster recovery, etc. And Devops, including Blue/Green deployment (simplest is having two service DNS sub domains, one for Eastern US and one for EU, but it can get more complex). Also, ETL, transactional data and decision support analytics/ warehouse.

So full stack normally includes everything that is not front end. The full stack staff engineers support front end engineers, providing API libraries client side for the front end team to use: so that the front end team does not have to worry anything about back end and services.

### Basics

Basics of full stack team is that they don't deal with end users or business, their 'client' is the front end developers. Ideal team size of full stack team is larger than 3, accounting for weekend on-call and vacation/sick coverage. The full stack team is local to the office - because some of their team members have access to data that needs to be secure. Hence you have to insure that the full stack engineer is responsible/liable and not 'judgment proof' (99% of hacks are internal) in case of an intentional data leak. That is in addition to using IP access for data and data servers.
(Aside, a good ratio of front end to full stack is larger than 2:1, so if you have 3 back end programmers, you'd want 6 front end devs.)

Who is a good candidate for full stack? As full stack is basics, this is not new tech, we have been doing CRUD since the 70's. Mostly you can use any imperative language (nodejs, python, go, etc.), know SQL (Declarative, or something similar if using noSQL), and know linux. Most cloud services are linux, for example you should know how to use iptables or similar.
If you did not get a science or engineering degree, you can finish a 6 week coding school and I'd hire you if you know SQL.
A few years of experience is a plus. 
If you have more than 7 years I'd expect a full stack programmer to be promoted to front end developer, going towards designer or product manager.

### ViewModel: what is the Job!

I want to explain what the real job of full stack developer is. So I'll explain some words, a ViewModel(VM): VM is a data structure that maps exactly to the page/form UI(View). For example if the front end view shows name/address/phone, then VM has those form properties in the way the view uses them. If there are two data table on the view, then the VM has 2 array like structures with elements mapping to the fields exactly.
This makes data binding of V to VM easy.
(VM can be flux or any other pattern, that is irrelevant at the high level, I'm just trying to define what, now how). 
And another words is O/R impedance (mismatch): This says that the E/R data model typically does not match the View and VM: how the data is displayed. The fields don't match, maybe it requires processing or joins or aggregates, etc. 
So now I can define what the job function of the full stack developer is: Full stack job is not to developer client side CRUD API's!
Yes, you do that, but that is incidental.
Full stack job is: to help front end developers read/display and write data in a way convenient to them: in a way that maps to the view and specifically not in a way that the data is stored. So the API needs to be helpful. If there are multiple API calls or the APIs are require a lot of processing to be displayed for a view, then the full stack team is doing a poor job. 
The front end team develops the view based on users requirements, and the full stack API services team's job is to allow the front end team to focus on that. If there is an impedance btwn the API and the View, that is a full stack problem. 
And: View's change from time to time. Hence API's change to match them. 
So again, full stack team's job is to handle view to back end mapping impedance. 
The CRUD part is incidental. As is performance, scalability, uptime, etc. 

:-)

In someways, the full stack team resembles FireStore offering, or even Parse SDK. 
