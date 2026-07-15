import { RESERVATION_WIDGET_ID } from "@/lib/constants";

const DISH_BASE_URL = "https://reservation.dish.co";

const TERMS_COPY: Record<
  string,
  { label: string; error: string; conditionsPath: string }
> = {
  fr: {
    label:
      'J\'accepte les <a href="/fr/conditions" target="_blank" rel="noopener noreferrer">conditions de réservation</a>.',
    error: "Veuillez accepter les conditions de réservation.",
    conditionsPath: "/fr/conditions",
  },
  en: {
    label:
      'I accept the <a href="/en/conditions" target="_blank" rel="noopener noreferrer">booking terms and conditions</a>.',
    error: "Please accept the terms and conditions.",
    conditionsPath: "/en/conditions",
  },
  de: {
    label:
      'Ich akzeptiere die <a href="/de/conditions" target="_blank" rel="noopener noreferrer">Reservierungsbedingungen</a>.',
    error: "Bitte akzeptieren Sie die Reservierungsbedingungen.",
    conditionsPath: "/de/conditions",
  },
};

const WIDGET_STYLES = `
.felicita-terms {
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.45;
  color: #555;
}
.felicita-terms label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}
.felicita-terms input[type="checkbox"] {
  margin-top: 3px;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  accent-color: #c49a2a;
}
.felicita-terms a {
  color: #c49a2a;
  text-decoration: underline;
}
.felicita-terms a:hover {
  opacity: 0.85;
}
`;

function buildTermsValidationScript(lang: string): string {
  const copy = TERMS_COPY[lang] ?? TERMS_COPY.fr;

  return `
<script>
(function () {
  var termsError = ${JSON.stringify(copy.error)};

  function bindTermsValidation() {
    if (!window.jQuery) {
      setTimeout(bindTermsValidation, 50);
      return;
    }

    var $ = window.jQuery;
    var errorMsg = $(".errorMsg");

    function checkTerms(event) {
      if (!$("#felicitaTermsAccept").is(":checked")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        errorMsg.text(termsError);
        return false;
      }

      errorMsg.text("");
    }

    $("form").on("submit", checkTerms);
    $("#btnConfirm, #btnConfirmOtherGuests, #btnConfirmAdditionalInfo").on("click", checkTerms);
  }

  bindTermsValidation();
})();
</script>`;
}

function buildTermsCheckbox(lang: string): string {
  const copy = TERMS_COPY[lang] ?? TERMS_COPY.fr;

  return `<div class="felicita-terms">
  <label for="felicitaTermsAccept">
    <input type="checkbox" id="felicitaTermsAccept" name="felicitaTermsAccept" />
    <span>${copy.label}</span>
  </label>
</div>`;
}

export function getDishWidgetUrl(lang: string): string {
  return `${DISH_BASE_URL}/widget/${RESERVATION_WIDGET_ID}?lang=${lang}`;
}

export async function fetchDishWidgetHtml(lang: string): Promise<string> {
  const response = await fetch(getDishWidgetUrl(lang), {
    headers: {
      Accept: "text/html",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Dish widget (${response.status})`);
  }

  return response.text();
}

export function customizeDishWidgetHtml(html: string, lang: string): string {
  const termsCheckbox = buildTermsCheckbox(lang);
  const validationScript = buildTermsValidationScript(lang);

  let customized = html;

  customized = customized.replace(
    /(<input[^>]*id="message"[^>]*\/>)\s*<div>[\s\S]*?<\/div>/,
    `$1\n${termsCheckbox}`,
  );

  customized = customized.replace(
    /<div class="form-group">\s*En outre, il est précisé[\s\S]*?bloctel\.gouv\.fr[\s\S]*?<\/div>\s*/i,
    "",
  );

  customized = customized.replace(
    /<div class="form-group">\s*In addition, it is specified[\s\S]*?bloctel\.gouv\.fr[\s\S]*?<\/div>\s*/i,
    "",
  );

  customized = customized.replace(
    /config\.apiUrlGetSlots\s*=\s*"(\/rest\/v1\/[^"]+)"/,
    'config.apiUrlGetSlots = "/api/reservation/proxy$1"',
  );

  customized = customized.replace(
    /config\.apiUrlReserve\s*=\s*"(\/rest\/v1\/[^"]+)"/,
    'config.apiUrlReserve = "/api/reservation/proxy$1"',
  );

  customized = customized.replace(
    "</style>",
    `${WIDGET_STYLES}\n</style>`,
  );

  customized = customized.replace(
    "</body>",
    `${validationScript}\n</body>`,
  );

  return customized;
}

export function getDishProxyTarget(path: string, search: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${DISH_BASE_URL}${normalizedPath}${search}`;
}
