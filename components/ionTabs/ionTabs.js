Template.ionTabs.rendered = function () {
  if ((this.data.class && this.data.class === 'tabs-top') || this.data.style === 'android') {
    Session.set('hasTabsTop', true);
  } else {
    Session.set('hasTabs', true);
  }

  // This is a fallback if no localStorage is found:
  // look through tabs and see if current route matches
  // one of the href attributes, cross fingers
  if( !Session.get('ionTab.current') ){
    this.$('.tabs').children().each(function() { 
      var href = $(this).attr('href');
      var current = Router.current().route.path();
      if(href === current){
        Session.set('ionTab.current', href);
      }
    });
  }
};

Template.ionTabs.destroyed = function () {
  Session.set('hasTabs', false);
  Session.set('hasTabsTop', false);
};

Template.ionTabs.helpers({
  classes: function () {
    var classes = [];

    if (this.class) {
      classes.push(this.class);
    }

    if (this.style === 'android') {
      classes.push('tabs-top tabs-striped tabs-icon-left');
    }

    if (this.style === 'ios') {
      classes.push('tabs-icon-top');
    }

    return classes.join(' ');
  }
});
