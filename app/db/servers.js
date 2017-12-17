import Rx from 'rxjs/Rx';

const Datastore = require('nedb');

const serversDB = new Datastore({ filename: 'datafile-servers', autoload: true });

function persistServer({ name, host, port, login, password }) {
  return Rx.Observable.create(observer => {
    serversDB.insert({ name, host, login, password }, (err, newDoc) => {
      if (err) {
        observer.error();
        return;
      }
      observer.next({
        name: newDoc.name,
        id: newDoc._id
      });
      observer.complete();
    });
  });
}

function removeServer(_id) {
  return Rx.Observable.create(observer => {
    serversDB.remove({ _id }, {}, (err, numRemoved) => {
      if (err) {
        observer.error();
        return;
      }
      observer.next();
      observer.complete();
    });
  });
}

function findServers(query) {
  return Rx.Observable.create(observer => {
    serversDB.find(query, function (err, docs) {
      if (err) {
        observer.error();
        return;
      }
      docs.forEach((element) => {
        observer.next({
          name: element.name,
          id: element._id,
          host: element.host,
          login: element.login,
          password: element.password
        });
      }, this);
      observer.complete();
    });
  });
}

function setMetaInf({ serverId, key, data }) {
  return findServers({ _id: serverId })
    .flatMap(({ meta, ...restServerInfo }) => Rx.Observable.create(observer => {
      serversDB.update({ _id: serverId }, { ...restServerInfo, meta: { ...meta, [key]: data } }, {}, (err, numRemoved) => {
        if (err) {
          observer.error();
          return;
        }
        observer.next();
        observer.complete();
      });
    }));
}

function getMetaInf({ serverId, key }) {
  console.log(serverId);
  return Rx.Observable.create(observer => {
    serversDB.findOne({ _id: serverId }, (err, doc) => {
      if (err) {
        observer.error();
        return;
      }
      observer.next(doc.meta ? doc.meta[key] : null);
      observer.complete();
    });
  });
}

export default {
  persistServer,
  removeServer,
  findServers,
  setMetaInf,
  getMetaInf
};
