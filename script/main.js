$(function () {

    const popupInteraction = (btnOpenSelector, popupMenuSelector) =>{
        $(btnOpenSelector).on('click', evt =>{
            evt.preventDefault();
            $(popupMenuSelector).fadeIn(300);
        });

        $(popupMenuSelector).on('click', evt =>{
            evt.preventDefault();
            if($(evt.target).hasClass('popup-close') || 
                $(evt.target).hasClass('popup')) 
                    $(popupMenuSelector).fadeOut(300);
        });
    };

    popupInteraction('a.call-btn', '.popup-call');
    popupInteraction('.main-form-btn', '.popup-consultation');
    popupInteraction('.capture-form-btn', '.popup-discount');
    popupInteraction('.discount-btn', '.popup-discount');
    popupInteraction('.check-btn', '.popup-check');
    popupInteraction('.consultation-btn', '.popup-consultation');

    const accordionMenu = () => {
        const $accWrapp = $('#accordion-two'),
                $accHeadBtn = $accWrapp.find('.panel-heading'),
                $accPanels = $accWrapp.find('.panel-collapse');

        $accHeadBtn.on('click', (evt) => {
            evt.preventDefault();
        
            const $panel = $(evt.currentTarget).next();
            $panel.slideDown(500);
            
            $accPanels
                .not($panel)
                .slideUp(500);
        });
    };
    
    accordionMenu();

    const accordinConstruct = () => {
        const $accWrapp = $('#accordion'),
                $accHeadBtn = $accWrapp.find('.panel-heading'),
                $accConstBtn = $accWrapp.find('.construct-btn'),
                $accPanels = $accWrapp.find('.panel-collapse');

        $('#vanished-box').fadeOut();

        $accHeadBtn.on('click', evt => {
            evt.preventDefault();
                
            const $panel = $(evt.currentTarget).next();
            $panel.slideDown(500);
                    
            $accPanels
                .not($panel)
                .slideUp(500);
        });

        $accConstBtn.on('click', evt => {
            evt.preventDefault();
            const $panelIndex = $accConstBtn.index(evt.currentTarget);
            if($panelIndex == 3) {
                $('.popup-discount').fadeIn(300);
                return;
            }
        
            $accPanels 
                .eq($panelIndex + 1)
                .slideDown(500);

            $accPanels
                .eq($panelIndex)
                .slideUp(500);
        });

    };

    accordinConstruct();

    const calculatorConstruct = () => {
        const $accWrapp = $('#accordion'),
            $accLabelWellCount = $accWrapp.find('.onoffswitch-label:first'),
            $accLabelWellFloor = $accWrapp.find('.onoffswitch-label:last'),
            $vanishedBox = $('#vanished-box'),
            $selectFirstWellDiam = $accWrapp.find('.form-control:eq(0)'),
            $selectFirstWellRingCount = $accWrapp.find('.form-control:eq(1)'),
            $selectSecondWellDiam = $accWrapp.find('.form-control:eq(2)'),
            $selectSecondWellRingCount = $accWrapp.find('.form-control:eq(3)'),
            $result = $('#calc-result');
        
        let wellIsOne = true,
            wellFirstDim = 1.4,
            wellFirstRingCount = 1,
            wellSecondDim = 1.4,
            wellSecondRingCount = 1,
            isFloor = true;

        const showResult = () => {
            let result = 0; 
            let firstWellDiamPrice = 9500;
                if(wellFirstDim == 2) firstWellDiamPrice = 13200;
            let firstWellRingPrice = 1500 * wellFirstRingCount;
            let floorPrice = 0;
                if(isFloor) floorPrice = 5000;
            let firstWellPrice = firstWellDiamPrice + firstWellRingPrice + floorPrice;
            if(!wellIsOne){
                let secondWellDiamPrice = 8700;
                    if(wellSecondDim == 2) secondWellDiamPrice = 10500;
                let secondWellRingPrice = 1500 * wellSecondRingCount;
                let allWellPrice = secondWellDiamPrice + secondWellRingPrice + firstWellPrice;
                result = allWellPrice;
            }else{
                result = firstWellPrice;
            }

            $({numberValue: 0}).animate({numberValue: result}, {
                    duration: 500, 
                    easing: 'swing',
                    step: function(val) {
                        $result.val(Math.ceil(val)); 
                }
		    });
        };

        const getSelectorValue = (selector) =>{
            const selectorVal = +selector.val().replace(/[^0-9\.]/ig, '');
            return selectorVal;
        }
            
        $accLabelWellCount.on('click', () => {
            $vanishedBox.fadeToggle();
            wellIsOne = wellIsOne ? false : true;
            if(wellIsOne){
                $selectSecondWellDiam.find('option:first').prop('selected', true);
                $selectSecondWellRingCount.find('option:first').prop('selected', true);
            }
            showResult()
        });

        $accLabelWellFloor.on('click', () => {
            isFloor = isFloor ? false : true;
            showResult()
        });

        $selectFirstWellDiam.on('change', () => {
            wellFirstDim = getSelectorValue($selectFirstWellDiam);
            showResult();
        });

        $selectFirstWellRingCount.on('change', () => {
            wellFirstRingCount = getSelectorValue($selectFirstWellRingCount);
            showResult();
        });

        $selectSecondWellDiam.on('change', () => {   
            wellSecondDim = getSelectorValue($selectSecondWellDiam);
            showResult();
        });

        $selectSecondWellRingCount.on('change', () => {
            wellSecondRingCount = getSelectorValue($selectSecondWellRingCount);
            showResult();
        });

        
        showResult();

    };

    calculatorConstruct();

    const getMoreSentence = () => {
        const $sentence = $('.sentence');
                $sentenceList = $sentence.find('.hidden');

        $('.add-sentence-btn').on('click', evt => {
            $sentenceList.removeClass('hidden');
            $('.add-sentence-btn').hide();
        });
    };

    getMoreSentence();

    const inputValidation = () => {
        $('input[name=user_name]').on('input', evt => {
            evt.target.value = evt.target.value.replace(/[^\p{Script=Cyrillic}\s]/gu,'');
        });
        
    }

    inputValidation();
});

