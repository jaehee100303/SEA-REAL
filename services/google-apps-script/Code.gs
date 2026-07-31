var SEA_REAL_TARGETS = { en: 'en', ja: 'ja', zh: 'zh-CN' };

function doGet(e) {
  var params = (e && e.parameter) || {};
  var callback = String(params.callback || '');
  var response;

  try {
    if (!/^[A-Za-z_$][0-9A-Za-z_$]{0,80}$/.test(callback)) {
      throw new Error('Invalid callback');
    }
    var target = SEA_REAL_TARGETS[String(params.target || '')];
    if (!target) throw new Error('Unsupported language');

    var encoded = String(params.data || '');
    if (!encoded || encoded.length > 16000) throw new Error('Invalid menu data');
    var json = Utilities.newBlob(Utilities.base64DecodeWebSafe(encoded)).getDataAsString('UTF-8');
    var payload = JSON.parse(json);
    var lines = Array.isArray(payload.lines) ? payload.lines.slice(0, 60) : [];
    if (!lines.length) throw new Error('No menu lines');

    var translations = lines.map(function(line, index) {
      var source = String(line == null ? '' : line).replace(/\s+/g, ' ').trim().slice(0, 300);
      if (!source) return { index: index, text: '' };
      return {
        index: index,
        text: LanguageApp.translate(source, 'ko', target)
      };
    });
    response = { ok: true, translations: translations };
  } catch (error) {
    response = { ok: false, error: String(error && error.message || error) };
  }

  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(response) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
