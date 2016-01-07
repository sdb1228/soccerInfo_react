/**
 * Copyright © 2014-2016 SoccerLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Feedback.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Feedback extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <a className={s.link} href="https://www.facebook.com/soccerlcapp/?fref=ts">Ask a question</a>
          <span className={s.spacer}>|</span>
          <a className={s.link} href="https://www.facebook.com/soccerlcapp/?fref=ts">Report an issue</a>
        </div>
      </div>
    );
  }

}

export default Feedback;
