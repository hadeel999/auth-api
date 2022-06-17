'use strict';

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.user.actions,">>>>>>>>>>>>>>>>>>>>>>>",capability)
      
      if (req.user.actions.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }

  }

}
