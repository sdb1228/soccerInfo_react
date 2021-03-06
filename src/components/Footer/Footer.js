/**
 * Copyright © 2014-2016 SoccerLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Footer.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Footer extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© SoccerLC</span>
          <span className={s.spacer}>·</span>
          <a className={s.link} href="/" onClick={Link.handleClick}>Home</a>
          <span className={s.spacer}>·</span>
          <a className={s.link} href="/privacy" onClick={Link.handleClick}>Privacy</a>
        </div>
      </div>
    );
  }

}

export default Footer;
