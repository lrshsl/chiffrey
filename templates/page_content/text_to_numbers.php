<div id="inputbox" class="center"></textarea>
  <div class="form-floating">

    <!-- Nice textarea from bootstrap -->
    <textarea id="source-input" placeholder="Enter the source text/code here" style="height:100px;border-radius:15px;" cols="1000" class="form-control"></textarea>
    <label for="source-input">Source Text</label>
  </div>
</div>

<div class="tool_panel row align-items-start justify-content-evenly">

  <!-- Mode Input -->
  <div class="col-4">
    <label for="mode-select" style="margin-right: 2px">Mode:</label>
    <select name="mode-select" id="mode-select" class="mid-sized-input">
      <option value="ascii">ascii representation</option>
      <option value="0index" selected="selected">index in alphabet</option>
      <option value="1index">index in alphabet (1 based)</option>
    </select>
  </div>

  <!-- 'Translate' Button -->
  <button id="translate-btn" onclick="exec_translate()" class="col-2">Translate</button>

  <!-- More Settings -->
  <div class="col-4" style="text-align: center">

    <!-- Collapse Toggle -->
    <div onclick="toggle_more_settings()" style="text-align: left" data-bs-toggle="collapse" data-bs-target="#more-settings" aria-expanded="false" aria-controls="more-settings">
      <label id=more-settings-arrow>></label>
      <label for="more-settings-arrow" id="more-settings-label">More Settings</label>
    </div>

    <!-- Collapsable -->
    <div class="collapse align-items-end" id="more-settings">

      <!-- Invert -->
      <label for="invert-input" class="light">Inverted: </label>
      <input type="checkbox" id="invert-input" title="source <- target" class="light left">

      <br><!-- Radix -->
      <label for="radix-input" title="hex: 16, dec: 10, bin: 1" class="light">Number System: </label>
      <input type="number" id="radix-input" value="16" title="hex: 16, dec: 10, bin: 1" onclick="select_content(this)" class="short-input left">

      <br><!-- Delimiter -->
      <label for="delimiter-input" title="Between the elements" class="light">Delimiter: </label>
      <input type="text" id="delimiter-input" value=" | " title="Between the elements" onclick="select_content(this)" class="short-input left">

      <br><!-- Prefix -->
      <label for="prefix-input" title="Before every element" class="light">Prefix: </label>
      <input type="text" id="prefix-input" value="" title="Before every element" onclick="select_content(this)" class="short-input left">

      <br><!-- Suffix -->
      <label for="suffix-input" title="After every element" class="light" b>Suffix: </label>
      <input type="text" id="suffix-input" value="" title="After every element" onclick="select_content(this)" class="short-input left">
    </div>
  </div>
</div>

<!-- Output -->
<div id="outputbox" title="Text entered in the above <Source Field> will be displayed here after clicking on <Translate>" class="center">
  <span id="output"></span>
</div>