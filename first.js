ContactList= new Meteor.Collection("clientlist");
if (Meteor.isClient)
{
   Template.form.events({
      'submit form' : function(event,template){
            event.preventDefault();
            var namevar= event.target.name.value;
            var contactvar= event.target.contact.value;
            if(namevar==="")
            {
                alert("Enter name field");
            }
            else
            {
                ContactList.insert({name: namevar, contact: contactvar});
                alert("Contact added");
            }
      }
   });
   Template.listcontact.helpers({
      'contactlist': function(){
          return ContactList.find();
      },
      'selectedcontact' : function(){
          var id= Session.get('session');
          if(id== this._id)
          {
              return "selected";
          }
          else
          {
              return "";
          }
      }
   });
   Template.listcontact.events({
      'click.ContactRow': function(event,template){
          var id= this._id;
          Session.set('session',id);
          console.log("contactrow" + Session.get('session'));
      },
      'click.Edit' :function(event,template){
        //  event.stopPropagation();
          Session.set('session',this._id);
          console.log("Edit button vala" + Session.get('session'));
      },
      'click.Delete': function(event,template){
        //  event.stopPropagation();
          var y=confirm("Sure,You want to delete");
          if(y===true)
          {
             ContactList.remove({"_id" : Session.get('session')});
             template.$(this).parent().parent().hide();
            alert("deleted");    
          }
      }
   });
   Template.edit12.helpers({
      'contactedit': function(){
          console.log("contact edit");
          var contact= ContactList.findOne({"_id" : Session.get('session')});
          console.log(contact);
          return contact;
      } 
   });
   Template.edit12.events({
       'click.Done': function(event,template){
            event.preventDefault();
            var contactvar= template.$("#contact").val();
            var namevar= template.$("#name").val();
            console.log(namevar+"    " + contactvar);
            ContactList.update({"_id": Session.get('session')},{"name" :namevar,"contact": contactvar});
            alert("contact updated");
       }
   }); 
}
if(Meteor.isServer)
{
    
}