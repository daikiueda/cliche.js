/**
 * ui/jquery.inPageLink.js
 * �y�[�W�������N�ɁA�ڕW�ʒu�ւ̃X�N���[�����ʂ�ǉ����܂��B
 */

(function(){
	/**
	 * �ݒ荀��
	 */
	/** 1ms�b���̈ړ������ipx�j */
	var SCROLL_VELOCITY =  0.6;

	/** �X�N���[�����Ԃ̍ŒZ�ims�j */
	var MIN_DURATION =  750;

	/** �X�N���[�����Ԃ̍Œ��ims�j */
	var MAX_DURATION = 2000;


	/**
	 * $.easing�̊g��
	 * @see http://gsgd.co.uk/sandbox/jquery/easing/
	 */
	$.extend( $.easing,
		{
			easeOutQuint: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			}
		}
	);

	/* �y�[�W�������N */
	$.fn.inPageLink = function(){
		if( !$("html,body").animate ){
			return this;
		}

		return this.each( function(){
			if( !this.href.match(/#.+$/) ) return;
			
			/* �y�[�W�������N���N���b�N���ꂽ�ۂ̏��� */
			$(this).click( function(){
				var targetId = this.href.match(/#.+$/)[0];

				var targetElm = $(targetId);
				if( targetElm.length !== 1 ) return true;
				if( targetElm.css("display") == "none" ) return false;

				var targetPos = targetElm.offset().top;
				var targetDistance = Math.abs( $('html, body').scrollTop() - targetPos );

				var animateTime = targetDistance * SCROLL_VELOCITY;
				animateTime = Math.max( animateTime, MIN_DURATION );
				animateTime = Math.min( animateTime, MAX_DURATION );

				$("html,body").animate({ scrollTop: targetPos }, animateTime, "easeOutQuint", function(){
					setTimeout( function(){
						location.href = location.href.replace(/(#.+|)$/,targetId);
					}, 100 );
				});
				
				return false;
			} );
		});
	}


	/**
	 * �����\������
	 */
	$( function(){
		$( "a[href]" ).inPageLink();
	} );
})();
