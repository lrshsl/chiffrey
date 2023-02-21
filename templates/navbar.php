
<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist" style="justify-content: center">
    <a class="nav-link active" id="nav-tab_home"     data-bs-toggle="tab" data-bs-target="#nav_home" type="button" role="tab" aria-controls="nav_home" aria-selected="true">Home</a>
    <a class="nav-link" id="nav-tab_text-to-numbers" data-bs-toggle="tab" data-bs-target="#nav_text-to-numbers" type="button" role="tab" aria-controls="nav_text_to_numbers" aria-selected="false">Text to numbers</a>
    <a class="nav-link" id="nav-tab_caesar-vigenere" data-bs-toggle="tab" data-bs-target="#nav_caesar-vigenere" type="button" role="tab" aria-controls="nav_caesar-vigenere" aria-selected="false">Caesar && Vigenère</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav_home" role="tabpanel" aria-labelledby="nav-tab_home" tabindex="0">
      <h2>title</h2>
  </div>
  <div class="tab-pane fade" id="nav_text-to-numbers" role="tabpanel" aria-labelledby="nav-tab_text_to_numbers" tabindex="0">
      <?php include "templates/page_content/text_to_numbers.php" ?>
  </div>
  <div class="tab-pane fade" id="nav_caesar-vigenere" role="tabpanel" aria-labelledby="nav-tab_caesar-vigenere" tabindex="0">
      <p>pasapapd</p>
  </div>
</div>
