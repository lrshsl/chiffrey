
<div class="center inputbox"></textarea>
  <div class="form-floating">

    <!-- Nice textarea from bootstrap -->
    <textarea id="source-input" title="Enter the source text/code here" style="height:100px;border-radius:15px;" cols="1000" class="form-control"></textarea>
    <label for="source-input">Source Text</label>

  </div>
</div>

<div class="tool_panel row align-items-start justify-content-evenly">

  <!-- Mode Input -->
  <div class="col-4">
    <label for="mode-select" style="margin-right: 2px">Mode:</label>
    <select name="mode-select" id="mode-select" class="mid-sized-input">
      <option value="caesar" selected="selected">Caesar</option>
      <option value="vigenere">Vigenère</option>
    </select>
  </div>

  <!-- 'Translate' Button -->
  <button onclick="exec_encode()" class="col-2 translate-btn">Encode</button>

  <!-- Key -->
  <div class="col-4" style="text-align: center">
    <!-- Caesar Key -->
    <div id="caesar-key-container">
      <label for="caesar-key-input">Key </label>
      <input type="number" id="caesar-key-input" class="short-input">
    </div>

    <!-- Vigenere Key -->
    <div id="vigenere-key-container">
      <label for="vigenere-key-input">Key </label>
      <input type="text" id="vigenere-key-input" class="short-input">
    </div>
  </div>
</div>

<!-- Output -->
<div title="Text entered in the above <Source Field> will be displayed here after clicking on <Encode>" class="center outputbox">
  <span class="output"></span>
</div>

<link rel="stylesheet" href="style/caesar_vigenere.css">
<script src="scripts/caesar_vigenere.js"></script>
