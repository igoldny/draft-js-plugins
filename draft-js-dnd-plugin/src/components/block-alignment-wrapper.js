import React, { Component } from 'react';
import { Entity } from 'draft-js';

const getDisplayName = (WrappedComponent) => (
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

// Export
export default function WrapComponent(C) {
  return class Wrapper extends Component {
    static displayName = `Decorated(${getDisplayName(C)})`;
    static defaultProps = {
      draggable: true,
      readOnly: false,
    };
    align(alignment) {
      const entityKey = this.props.block.getEntityAt(0);
      if (entityKey) {
        Entity.mergeData(entityKey, { alignment });

        // Force refresh
        this.props.blockProps.refreshEditorState();
      }
    }

    render() {
      const { blockProps } = this.props;
      return (
          <C {...this.props}
            alignment={blockProps.alignment}
            align={::this.align}
          />
      );
    }
  };
}
