sections = document.getElementsByClassName("section")

function switchSection(newSectionId) {

    for (var i = 0; i < sections.length; i++) {
        section = sections[i]
        if (section.id === newSectionId) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }
}
switchSection("main")