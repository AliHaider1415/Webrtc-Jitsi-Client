class PeerService {
  constructor() {
    this.peer = null;
  }

  initializePeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    this.setupPeerListeners();
  }

  setupPeerListeners() {
    if (!this.peer) return;

    this.peer.addEventListener("track", (event) => {
      console.log("Received remote track", event);
    });

    this.peer.addEventListener("negotiationneeded", async () => {
      console.log("Negotiation needed");
      try {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        // Handle the negotiation by sending the offer to the remote peer
      } catch (error) {
        console.error("Error during negotiation:", error);
      }
    });

    this.peer.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        // Send the candidate to the remote peer
        console.log("New ICE candidate", event.candidate);
      }
    });

    this.peer.addEventListener("connectionstatechange", () => {
      console.log("Connection state changed:", this.peer.connectionState);
      if (this.peer.connectionState === "closed") {
        this.initializePeer();
      }
    });
  }

  reinitializePeer() {
    if (this.peer) {
      this.peer.close();
    }
    this.initializePeer();
  }

  async getOffer() {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      return null;
    }
  }

  async getAnswer(offer) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error creating answer:", error);
      return null;
    }
  }

  async setLocalDescription(description) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setLocalDescription(
        new RTCSessionDescription(description)
      );
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }

  async setRemoteDescription(description) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setRemoteDescription(
        new RTCSessionDescription(description)
      );
    } catch (error) {
      console.error("Error setting remote description:", error);
    }
  }
}

export default new PeerService();
