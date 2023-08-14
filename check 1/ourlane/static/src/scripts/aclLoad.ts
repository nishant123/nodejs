import ACLService from '../services/acl/index';


ACLService.loadRolePolicyResourceMapping();

setTimeout(() => {
  process.exit();
}, 5000);
