'use strict';
$().ready(function () {


  $.get('/api/renders', function (data) {
    // append plans

    Object.keys(data).forEach(function (planType) {
      data[planType].forEach(function (plan) {
        $('.' + planType + '-gallery').append(getPlanHTML(plan));
      });
    });

    $('.lazy').lazy({
      effect: 'fadeIn',
      effectTime: 1300
    });

    baguetteBox.run('.map-gallery');
  });
});


function getPlanHTML (planData) {

  let renderID = planData.render_url.split('/').pop();
  let renderPicture = `http://upload.farm/static/renders/${renderID}/${renderID}-plan.png`;
  return `<div class="large-3 columns map-item">
            <a class="th lightbox" href="${renderPicture}" target="_blank">
                <img class="lazy" data-src="${renderPicture}" />
            </a>
            <a class="button hollow secondary small" target="_blank" href="/planner/${planData.slug}">Plan</a>
        </div>`;
}