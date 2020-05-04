import IconButton from '@material-ui/core/IconButton';
import b4w from 'blend4web';
import React, { Component } from 'react';

class AvatarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vision: false, // 3D model
      toggle3D: () =>
        this.state.vision
          ? this.setState({ vision: false })
          : this.setState({ vision: true }),
    };
  }

  render() {
    return (
      <div className="wrap">
        <div className="circle">
          <div
            id="canvas_3d_avatar"
            style={{ display: this.state.vision ? 'block' : 'none' }}
          ></div>
          <div
            id="canvas_avatar"
            style={{ display: this.state.vision ? 'none' : 'block' }}
          >
            <img src="/img/profile.jpg" alt="Foto de perfil" />
          </div>
          <IconButton
            className="toggle_3d_vision"
            onClick={this.state.toggle3D}
          >
            <i className="fas fa-cube"></i>
          </IconButton>
        </div>
      </div>
    );
  }

  componentDidMount() {
    var m_app = b4w.app;
    var m_data = b4w.data;
    var m_preloader = b4w.preloader;

    // detect application mode
    var APP_ASSETS_PATH = 'blend4web/AvatarHeader/';

    m_app.init({
      canvas_container_id: 'canvas_3d_avatar',
      callback: (canvas_elem, success) => {
        if (!success) {
          console.log('b4w init failure');
          return;
        }

        m_preloader.create_preloader();

        // ignore right-click on the canvas element
        canvas_elem.oncontextmenu = function (e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };

        /*m_log_nodes.append_custom_callback("callback_depoisCliqueTrato", callback_depoisCliqueTrato);
              m_log_nodes.append_custom_callback("callback_tratoclick", callback_tratoclick);
              m_log_nodes.append_custom_callback("callback_objclick", callback_objclick);*/

        load();
      },
      show_fps: false,
      autoresize: true,
      alpha: true,
      console_verbose: true,
    });

    /**
     * load the scene data
     */
    function load() {
      m_data.load(APP_ASSETS_PATH + 'AvatarHeader.json', load_cb, preloader_cb);
    }

    /**
     * update the app's preloader
     */
    function preloader_cb(percentage) {
      m_preloader.update_preloader(percentage);
    }

    /**
     * callback executed when the scene data is loaded
     */
    function load_cb(data_id, success) {
      if (!success) {
        console.log('b4w load failure');
        return;
      }

      m_app.enable_camera_controls();

      // place your code here
    }
  }
}

export default AvatarHeader;
