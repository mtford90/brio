var React = require('react');

var FuncParam = React.createClass({
  render: function () {
    var name = this.props.name,
      def = this.props.def;


    var heading = name + ' ' + '<' + def.type + '>';
    if (def.optional) {
      heading = '[' + heading + ']';
    }
    return (
      <div>
        <span>{def.optional ? '[' : ''}
          <a ref="a" href='#' className="highlighted-tooltip">
            {name}
          </a>
        {def.optional ? ']' : ''}</span>

        <div ref="tooltipContents" style={{display: 'none'}}>
          <h5>{heading}</h5>
        </div>
      </div>

    )
  },
  componentDidMount: function () {
    var $a = $(this.refs['a'].getDOMNode());
    var $content = $(this.refs['tooltipContents'].getDOMNode()).clone();
    $content.css('display', 'block');

    console.log('$content', $content);
    $a.tooltipster({
      theme: 'my-custom-theme',
      position: 'bottom-right',
      content: $content
    });

  }
});

module.exports = FuncParam;
