import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'
import classname from 'classnames';
import '../styles/tooltip.css'
export default class ReactTooltip extends React.Component{
  static defaultProps = {
    effect: 'float'
  }
  static propTypes = {
    place: React.PropTypes.string,
    ttype: React.PropTypes.string,
    effect: React.PropTypes.string
  }
  constructor(props){
    super(props);
    this.state = {
      show: false,
      placeholder: "",
      x: "auto",
      y: "auto",
      place: this.props.place,
      ttype: this.props.ttype,
      effect: this.props.effect
    }
    this.showTooltip = this.showTooltip.bind(this)
    this.updateTooltip = this.updateTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }
  showTooltip(e) {
    var $target = $(e.currentTarget)
    this.setState({
      placeholder: $target.attr('data-tip'),
      place: $target.data('place') ? $target.data('place') : (this.props.place ? this.props.place : "top"),
      type: $target.data('type') ? $target.data('type') : (this.props.type ? this.props.type : "dark"),
      effect: $target.data('effect') ? $target.data('effect') : (this.props.effect ? this.props.effect : "float")
    })
    this.updateTooltip(e)
  }
  updateTooltip(e) {
    var $target = $(e.currentTarget)
    if(this.state.effect === "float") {
      this.setState({
        placeholder: $target.attr('data-tip'),
        show: true,
        x: e.clientX,
        y: e.clientY
      })
    }else if(this.state.effect === "solid"){
      const offset = $target.offset()
      const $tooltip = $('[data-id="tooltip"]')
      const targetTop = offset.top;
      const targetLeft = offset.left;
      const tipWidth = $tooltip.length ? $tooltip.width() : 0;
      const tipHeight = $tooltip.length ? $tooltip.height() : 0;
      const tipPadding = $tooltip.length ? $tooltip.css("padding") : 0;
      const targetWidth = $target.width();
      const targetHeight = $target.height();
      const { place } = this.state;
      let x, y ;
      if(place === "top") {
        x = targetLeft - (tipWidth / 2) + (targetWidth / 2);
        y = targetTop - tipHeight - 8;
      }else if(place === "bottom") {
        x = targetLeft - (tipWidth / 2) + (targetWidth / 2);
        y = targetTop + targetHeight + 8;
      }else if(place === "left") {
        x = targetLeft - tipWidth - 6;
        y = targetTop + (targetHeight / 2) - (tipHeight / 2);
      }else if(place === "right") {
        x = targetLeft + targetWidth + 6;
        y = targetTop + (targetHeight / 2) - (tipHeight / 2);
      }
      this.setState({
        placeholder: $target.attr('data-tip'),
        show: true,
        x: x ? x : this.state.x,
        y: y ? y : this.state.y
      })
    }
  }
  hideTooltip(e){
    this.setState({
      show: false,
      x: -9999,
      y: -9999
    });
  }
  componentDidMount() {
    $(document)
      .delegate('[data-tip]', 'mouseover', this.showTooltip)
      .delegate('[data-tip]', 'mousemove', this.updateTooltip)
      .delegate('[data-tip]', 'mouseleave', this.hideTooltip)
    // 当hash发生改变时隐藏tooltip, 也可以用MutationObserver监听目标DOM解决
    $(window).on('hashchange', this.hideTooltip)
  }
  componentWillUnmount() {
    $(document)
      .undelegate('[data-tip]', 'mouseover', this.showTooltip)
      .undelegate('[data-tip]', 'mousemove', this.updateTooltip)
      .undelegate('[data-tip]', 'mouseleave', this.hideTooltip)

    $(window).off('hashchange', this.hideTooltip)
  }
  render() {
    const $tooltip = $('[data-id="tooltip"]')
    const tipWidth = $tooltip.length ? $tooltip.width() : 0;
    const tipHeight = $tooltip.length ? $tooltip.height() : 0;
    const offset = {x: 0, y: 0};
    const { effect } = this.state;
    if(effect === "float") {
      if(this.state.place === "top") {
        offset.x = -(tipWidth / 2);
        offset.y = -50;
      }      else if(this.state.place === "bottom") {
        offset.x = -(tipWidth / 2);
        offset.y = 30;
      }      else if(this.state.place === "left") {
        offset.x = -(tipWidth + 15);
        offset.y = -(tipHeight / 2);
      }      else if(this.state.place === "right") {
        offset.x = 10;
        offset.y = -(tipHeight / 2);
      }
    }
    const style = {
      zIndex: 9999,
      left: `${((!this.state.x || this.state.x === 'auto') ? 0 : this.state.x) + offset.x  }px`,
      top: `${((!this.state.y || this.state.y === 'auto') ? 0 : this.state.y) + offset.y  }px`
    }
    const tooltipClass = classname(
      'reactTooltip',
      {"show": this.state.show},
      {"place-top": this.state.place === "top"},
      {"place-bottom": this.state.place === "bottom"},
      {"place-left": this.state.place === "left"},
      {"place-right": this.state.place === "right"},
      {"type-dark": this.state.type === "dark"},
      {"type-success": this.state.type === "success"},
      {"type-warning": this.state.type === "warning"},
      {"type-error": this.state.type === "error"},
      {"type-info": this.state.type === "info"},
      {"type-light": this.state.type === "light"}
    );
    return (
      <div className={tooltipClass} style={style} data-id="tooltip">
        <div className="tooltip-content" dangerouslySetInnerHTML={{
          __html: this.state.placeholder
        }}></div>
      </div>
    )
  }
}
$(function(){
  var $el = $('<div />')
  var el = $el.get(0)
  $el.appendTo('body');
  ReactDOM.render(<ReactTooltip ttype="dark" effect="solid"/>, el);
})