const config = require('easy-config');
const uploader = require('./uploader');
const db = require('./db');


function migrateRelevant () {
  return db('render')
    .join('farm', 'farm.id', '=', 'render.farm_id')
    .whereNotNull('useful_at')
    .orWhereNotNull('popular_at')
    .select('render.*', 'farm.slug AS slug', 'farm.oldId AS oldId')
    .then(relevant => {
      let p = Promise.resolve();

      console.log('Starting upload for', relevant.length);

      relevant.forEach(render => {
        p = p.then(() => {
          let renderID = render.original_url.split('/').pop();
          let renderPicture = `https://upload.farm/static/renders/${renderID}/${renderID}-plan.png`;

          return uploader(renderPicture, config.google.renderBucket, (render.slug || render.oldId) +'.png')
            .then(uploadedUrl => {
              if (uploadedUrl) {
                return db('render')
                  .update({
                    render_url: uploadedUrl
                  })
                  .where('id', render.id);

              }
            });
        });
      });

      return p;
    })
    .then(() => {
      console.log('Finished upload migration');
      process.exit(1);
    });
}

migrateRelevant();