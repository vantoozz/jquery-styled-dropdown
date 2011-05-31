(function ($) {
    $.fn.styledDropdown = function () {

        var selectedOption = this.find('option:selected');

        var selected = {
            id: selectedOption.val(),
            title: selectedOption.text()
        };

        var options = new Array();
        this.find('option').each(function () {
            var $this = $(this);
            options.push({
                id: $this.val(),
                title: $this.text()
            });
        });


        var styledDropdownID = 'syledDropdown_' + Math.floor(Math.random() * 1000) + '_' + new Date().getMilliseconds();
        var html = '<div class="styledDropdown" id="' + styledDropdownID + '">'
        		 + '<div class="styledDropdown_selectedOption" id="selectedOption_' + styledDropdownID + '" data-id="' + selected.id + '">' + selected.title + '</div>'
        		 + '<div class="styledDropdown_optionsWrapper" id="optionsWrapper_' + styledDropdownID + '">'
        		 + '<ul>';
        var i;
        for (i in options) {
            html += '<li data-id="' + options[i].id + '">' + options[i].title + '</li>';
        }
        html += '</ul>'
             + '</div>'
             + '</div>';

        var clone = this.clone();

        this.replaceWith(html);


        var $styledDropdown = $('#' + styledDropdownID);
        var $optionsWrapper = $styledDropdown.find('div.styledDropdown_optionsWrapper');
        var $selectedOption = $styledDropdown.find('div.styledDropdown_selectedOption');

        $styledDropdown.prepend(clone);

        var $hiddenSelect = $styledDropdown.find('select')
        $hiddenSelect.hide();
        var $hiddenOptions = $hiddenSelect.find('option');


        $selectedOption.click(function (event) {
            event.stopPropagation();
            $optionsWrapper.toggle();
            $selectedOption.toggleClass('droped');
        });

        $optionsWrapper.find('li').click(function () {
            var $this = $(this);
            $selectedOption.attr('data-id', $this.attr('data-id')).html($this.html()).toggleClass('droped');
            $optionsWrapper.toggle();
            $hiddenOptions.attr('selected', '');
            $hiddenSelect.find('option[value=' + $this.attr('data-id') + ']').attr('selected', 'selected').val($this.attr('data-id'));
            $hiddenSelect.trigger('change')
        });

        $('body').click(function (event) {
            if ($selectedOption.hasClass('droped')) {
                var needtohide = false;
                if (event.srcElement) {
                    if ('selectedOption_' + styledDropdownID != event.srcElement.id && 'optionsWrapper_' + styledDropdownID != event.srcElement.id) needtohide = true;
                }
                else needtohide = true;
                if (needtohide) {
                    $optionsWrapper.toggle();
                    $selectedOption.toggleClass('droped');
                }
            }
        });

    };
})(jQuery);
