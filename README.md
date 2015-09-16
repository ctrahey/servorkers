#Services in WebWorkers

Yes I am VERY good at picking project names. Servorkers. ;-)

This is a theory/proof-of-concept project with the intention of dispatching
Angular services to do all their work in a WebWorker thread.

##Design Goals
1. Respect UI performance by making it VERY easy to move significant work to different threads
1. No change needed in how Services are authored: use the same services you already use.
1. No change needed in how Services are consumed if the service is already Promise-oriented.
1. Only change how you 'load' the service

##Video
<a href="https://vimeo.com/133250679">
	<img src="https://farm6.staticflickr.com/5674/21468335125_827ad8e8a5_h.jpg" width="300" />
</a>


##Motivation
I was working on a very large Angular project which was primarily a tablet interface, but which
had large data sets and plenty of network-loaded assets for most interactions. We were working with
a client who could ensure a mutli-core chip was in the final build of the device, and this project
is an attempt to take advantage of that in order to deliver remarkable UI performance in a fully
web-based interface.

##Caveats
The project uses ES6's Proxies, which I tested by enabling expirimental JS in Chrome.
There is a refactor that depends on my Angular PR - which introduces defered Service Factories -
instead of Proxies. With the Angular 2 effort eclipsing most significant Angular PRs, that is 
unlikely to happen. However...

##Next Steps
With the advent of Babel, I will be looking to refactor this project to use their Proxy implementation
or at least explore it.
