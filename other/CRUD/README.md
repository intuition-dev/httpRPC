



<img src="http://MetaBake.github.io/mbakeDocs/logo.jpg" width="100">

Demo: http://youtube.com/watch?v=B-mSA71S7VY

# CRUD Examples

There are four basic examples:

- Table with basic onClick event (tabulator.js)
- Form Validation
- Authentication (example is in intu )

You'll need to run 'node dev1.ts' to create the db

## Structure explanation based on  "Table with basic onClick event" example

- screen/tabulator/index.pug: View
- screen/tabulator/TabulatorBind.js: binds TabulatorViewModel.js to the View
- assets/models/TabulatorViewModel.js: VM(view model) that reflects the View




## CRUD w/ ViewModel (VM) 

You can use any framework or library with MetaBake . And MetaBake comes with a recommended 'app framework' for Web Apps in 3 lines:


      interface iViewModel{
         /**
         * Return 2 objects if 2 forms
         * or return 2 objects if 2 components
         * or 2 arrays if 2 tables.
         * Or a mix: 1 form and 1 table and 1 components is 1 array and 2 objects
         */
         getData(key?:string):Object

         // returns 'OK', else an error message should be shown by View|Binding
         validate():string 
         
         log(...a):void
      }//()



This is somewhat similar to M-VM-V. Major difference is that the VM for MetaBake is
what KnockOut called Complex VM or a Master VM.
Minor difference is that the M is called Services in MetaBake . (and V is Pug for us). So this is S-VM-V architecture.

Since it is an interface and .js has no interfaces it is just to guide you: When you write a Model, it must map to the View(the entire Pug page|screen, that has *state* via query string, eg: &cust=102).
So how to use:
- Your model must map to the view!
- If you have 2 tables in your view, you should have 2 lists in the model. If you have 2 forms in view, you should have 2 object in your model. etc.
- When you read() or fetch() from binding or page, the read() | fetch() should return one of the 3 methods above.
- In you read|fetch you can use promises, callbacks or events or even flux like events.

The goal is to be as flexible as possible. When you have a form, table or chart, you must have a VM. 

(if you create includes, tags/components, you should pass the VM to it)

VM also has a dataSourceType: string = 'real'  //real or fake

VM should also do any data validation; returning an empty string if OK or an error message.
The purpose of VM is to allow development of View to be quicker; and to allow for a demo if back-end is b0rked.

### ViewModel

You can use any .js libraries / tools you like. But the default is our Typescript based 'ViewModel'. 
'ViewModel' is front-end, runs in the browser and it's main functionality is 
that is must to map exactly to our Pug View/screen. ViewModel provides simple data structures so that the View can easily bind to it. 
Validation is also included.

Here is an example app and a readme:
[examples/CRUD](https://github.com/intuition-dev/INTUITION/tree/master/examples/CRUD/www)



### Advanced
- You should favor composition over inheritance. You should even look at VM as an ECS(Entity-Component-System), where Entity is the name of the VM, 
and it must match the name of the page/screen folder; the components is the IVM methods that return the Collection|Data Structures 
that map to view, and systems are your CRUD type methods.
eg. ECS: http://archive.is/yRvvG
- Services classes should be documented via document.js
- If an event bus is needed by the view, you can use browser's built in Custom Events to wire VM, binding, screen and components. 

## Testing

- If you want to do e2e testing, you test VM (not the View; test the ViewModel, eg. via: http://qunitjs.com )



# Other


- Avoid binding like this:
    dirs.forEach(el => {
       listTemp += '<li><div><i class="i-file"></i>' el + '</div></li>';

Instead use mustache or dot or such.

- Tutorial would show tabulator.js, forms

- Using ViewModel pattern to separate the data from views

- all models in assets/models that gets bind in screen/...

- The view *must* lazy load.

Your VM must map to the (pug or component) View! Component have their own VM (in their own folder)

- There is a SQLite plugin in VS Code

