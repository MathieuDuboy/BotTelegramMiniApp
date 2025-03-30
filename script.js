// === GESTION DES PAGES ===
let previousPage = 'home';

function changeLanguage(language) {
  console.log("dqdqsdqsdqsden")
  $.getJSON('translations.json', function(data) {
      let translations = data[language];
      
      // Mise à jour des textes de la page avec les traductions
      $('#title').text(translations.title);
      $('#user-id').text(translations.user_id);
      $('#top-up-button').text(translations.top_up);
      $('#block-card-button').text(translations.block_card);
      $('#order-card-button').text(translations.order_card);
      $('#no-transactions-message').text(translations.no_transactions);
      $('#settings-header').text(translations.settings);
      $('#settings-header-bis').text(translations.settings);
      $('#contact-support-header').text(translations.contact_support);
  });
}

// Par défaut, charger la langue anglaise
changeLanguage('en');

$(document).ready(function() {

      $("#settingsSection input[type='radio']").on('change', function() {
          var selectedValue = $(this).val();
          console.log("Selected radio value: " + selectedValue);
          changeLanguage(selectedValue);

      });
      $("#order_card_btn").click(function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        window.location.href = "/start"; // Redirige vers /start
    
        setTimeout(function() {
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.close(); // Ferme la mini-app après la redirection
            }
        }, 500); // Attente pour éviter la fermeture avant la redirection
    });
});

function showPage(pageId) {
  $(`#${previousPage}`).addClass('d-none');
  $(`#${pageId}`).removeClass('d-none');
  previousPage = pageId;

  $('#backButton').toggleClass('d-none', pageId === 'home');
}

function goBack() {
  showPage('home');
}

function toggleCardFlip() {
  $('.credit-card').toggleClass('is-flipped');
}

// === INITIALISATION TELEGRAM ===



// === ERREUR STYLISÉE ===
const errorDiv = $('<div></div>')
  .css({
    padding: "10px",
    background: "#ff4d4d",
    color: "white",
    "border-radius": "5px",
    "margin-top": "10px",
    display: "none"
  })
  .appendTo('body');

  function getData(userId) {
    $('#user_card_find, #user_card_none, #transaction_find, #transaction_none, #transaction_seeall').hide();
    $('#user_card_loader, #transaction_loader').fadeIn();
    
    fetch(`https://107.189.17.87:3001/api/getUser/${userId}`, {
    method: 'GET',
    credentials: 'include' // IMPORTANT si ton API utilise des sessions ou cookies
        })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse API :", data);
            $('#user_card_loader, #transaction_loader').fadeOut(400, function () {
                if (data.success) {
                    console.log('Utilisateur trouvé:', data.user);
                    $('#user_card_find, #transaction_find, #transaction_seeall').fadeIn();
                } else {
                    console.log('Utilisateur non trouvé');
                    $('#user_card_none, #transaction_none').fadeIn();
                }
            });
        })
        .catch(error => {
            console.error("Erreur de récupération des données", error);
            $('#user_card_loader, #transaction_loader').fadeOut(400, function () {
                $('#user_card_none, #transaction_none').fadeIn();
            });
        });
  }
  
// === GESTION DES ERREURS ===
function showError(message) {
  errorDiv.text(message).fadeIn();

  console.error(message);

  setTimeout(() => {
    errorDiv.fadeOut();
  }, 5000);
}

// === MODALE "BLOCK CARD" ===
function showBlockCardModal() {
  const modalHtml = `
        <div class="modal fade" id="blockCardModal" tabindex="-1" aria-labelledby="blockCardModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="blockCardModalLabel">Confirm Action</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to block your card?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abort</button>
                        <button type="button" class="btn btn-danger" id="confirmBlock">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  $('body').append(modalHtml);
  const modal = new bootstrap.Modal($('#blockCardModal'));
  modal.show();

  $('#confirmBlock').on('click', () => {
    blockCard().then((status) => {
      modal.hide();
      showConfirmationMessage(status);
    });
  });
}

// === FONCTION FICTIVE "BLOCK CARD" ===
async function blockCard() {
  return new Promise((resolve) => setTimeout(() => resolve(Math.random() > 0.5 ? 'success' : 'error'), 1000));
}

// === AFFICHAGE MESSAGE DE CONFIRMATION ===
function showConfirmationMessage(status) {
  const alertPlaceholder = $('#liveAlertPlaceholder');
  const type = status === 'success' ? 'success' : 'danger';
  const message = status === 'success'
    ? "✅ Your card has been successfully blocked!"
    : "❌ Failed to block your card. Please try again.";

  const wrapper = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);

  alertPlaceholder.html(wrapper);

  setTimeout(() => wrapper.fadeOut(), 4000);
}