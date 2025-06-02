javascript:(function() {
    const conversionMap = {
    "f": "ˈ",
	"v": "ˌ",
	"`": "ˋ",
	"~": "ˎ",
	";": "·", 
	"q": "ȧ", 
	"c": "ė",
	"l": "ȯ",
	"j": "ı"
    };

    const inputElements = document.querySelectorAll('input, textarea');

    inputElements.forEach(input => {
        input.addEventListener('input', function() {
            let value = input.value;

            Object.keys(conversionMap).forEach(key => {
                const regex = new RegExp(key, 'g');
                value = value.replace(regex, conversionMap[key]);
            });

            input.value = value;
        });
    });
})();
