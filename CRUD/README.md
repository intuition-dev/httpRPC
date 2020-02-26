

Demo: http://youtube.com/watch?v=B-mSA71S7VY

# Very short CRUD Example

This shows how to:
- load DB w/ fake data
- fetch it from browser
- (end2end) test
- load (stress) test


## CRUD w/ ViewModel (VM) 

You can use any framework or library with INTUITION .  And INTUITION  comes with a recommended 'app framework' for Web Apps, a ViewModel. VM.
The VM contains the fetch, REST, RPC or such commands to get the remote data.
But more important: the VM maps to the View data fields exactly.

This is similar to M-VM-V patern. Major difference is that the VM for INTUITION  is
what KnockOut called Complex VM or a Master VM.

The VM is called by the View's UIBinding and VM is tested end2end and (distributed) load/stress to find the performance.


So how to use:
- Your model must map to the view!
- If you have 2 tables in your view, you should have 2 lists in the model. If you have 2 forms in view, you should have 2 object in your model. etc.
- When you read() or fetch() from binding or page, the read() | fetch() should return one of the 3 methods above.
- In you read|fetch you can use promises, callbacks or events or even flux like events.

The goal is to be as flexible as possible. When you have a form, table or chart, you must have a VM. 

VM should also do any data validation; returning an empty string if OK or an error message.
The purpose of VM is to allow development of View to be quicker; and to allow for a demo if back-end is b0rked.

### ViewModel

You can use any .js libraries / tools you like. But the default is our Typescript based 'ViewModel'. 
'ViewModel' is front-end, runs in the browser and it's main functionality is 
that is must to map exactly to our Pug View/screen. ViewModel provides simple data structures so that the View can easily bind to it. 
Validation is also included.

