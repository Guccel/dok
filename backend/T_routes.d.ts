//## /user
export namespace user {
  //## POST
  interface POST_req {
    method: 'all' | 'user' | 'admin';
    // filter?: null;
  }
  interface POST_res {
    length: number;
    _ids: string[];
  }
  //## /user/get/:_id
  namespace get {
    interface POST_req {
      method: 'basic' | 'all';
    }
    interface POST_res {
      [key: string]: any; // dunno how to fill these types yet
    }
  }
  //## /user/patch/:_id
  namespace patch {
    interface POST_req {
      username?: string;
      email?: string;
      type?: 'user' | 'admin';
    }
    // POST_res null
  }
  namespace register {
    interface POST_req {
      username: string;
      email: string;
      password: string;
    }
  }
  namespace login {
    interface POST_req {
      username: string;
      password: string;
    }
    interface POST_res {
      session_id: string;
    }
  }
}
//## /session
export namespace session {
  namespace getData {
    // POST_res null

    interface GET_res {
      [key: string]: any;
    }
  }
}
