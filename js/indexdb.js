var dbx = idb.open('sepakbola', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('tim', { 'keyPath': 'id' })
    }
  });
  
  
  
  var insertTeam = (tim) => {
    dbx.then(db => {
      var tx = db.transaction('tim', 'readwrite');
      var store = tx.objectStore('tim')
      tim.createdAt = new Date().getTime()
      store.put(tim)
      return tx.complete;
    }).then(() => {
      M.toast({ html: `${tim.name} berhasil disimpan!` })
      console.log('berhasil disimpan');
    }).catch(err => {
      console.error('gagal penyimpan', err);
    });
  }
  
  var deleteTeam = (idTim) => {
    dbx.then(db => {
      var tx = db.transaction('tim', 'readwrite');
      var store = tx.objectStore('tim');
      store.delete(idTim);
      return tx.complete;
    }).then(() => {
      M.toast({ html: 'Sudah Di Hapus!' });
    gettimSaved();
    }).catch(err => {
      console.error('Error: ', err);
    });
  }
  
  var getTimsave = () => {
    return dbx.then(db => {
      var tx = db.transaction('tim', 'readonly');
      var store = tx.objectStore('tim');
      return store.getAll();
    })
  }
  
  
  
  var insertTeamListener = idTim => {
    var tim = dataTim.teams.filter(el => el.id == idTim)[0]
    insertTeam(tim);
  }
  
  var deleteTeamListener = idTim => {
    var c = confirm("Yakin Mau Hapus?")
    if (c == true) {
      deleteTeam(idTim);
    }
  }
  
  var showLoader = () => {
    var html = `<div class="preloader-wrapper medium active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
                </div>`
      let doc = document.getElementById('loader');          
      doc.innerHTML = html;
  }
  
  var hideLoader = () => {
    let doc = document.getElementById('loader');
    doc.innerHTML = '';
  }